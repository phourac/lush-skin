// utils/fetch-util.ts
import { getSession } from '@/actions/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '';

if (!BASE_URL) {
  console.warn('⚠️ NEXT_PUBLIC_API_URL environment variable is missing');
}

export interface FetchServerOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  auth?: boolean; // 👈 ADD THIS
}

export async function FetchServer<T = unknown>(
  path: string,
  options: FetchServerOptions = {}
): Promise<T & { error?: boolean; status?: number; message?: string }> {
  const { params, auth = true, ...rest } = options;

  let url = `${BASE_URL || ''}${path}`;
  let token: string | undefined;
  if (auth) {
    const session = await getSession();
    token = session?.accessToken;
  }

  // Build query params
  if (params && Object.keys(params).length > 0) {
    const search = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    ).toString();
    url += (url.includes('?') ? '&' : '?') + search;
  }

  try {
    const response = await fetch(url, {
      ...rest,
      headers: {
        ...(rest.body instanceof FormData
          ? {} // ❗ DO NOT set Content-Type for FormData
          : { 'Content-Type': 'application/json' }),
        ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),

        'x-tenant-id': TENANT_ID,
        ...(rest.headers || {}),
      },
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      // ✅ Only console log, do NOT crash

      return {
        ...(typeof data === 'object' ? data : {}),
        error: true,
        status: response.status,
        message: (data as any)?.message || response.statusText,
      };
    }

    return data;
  } catch (err) {
    // ✅ Also do not crash here
    console.warn('❌ Network/Fetch error:', err);

    return {
      error: true,
      status: 500,
      message: (err as Error)?.message || 'Network error',
    } as any;
  }
}
