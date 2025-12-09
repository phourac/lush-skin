import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY || '';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  expires: new Date('9999-12-31'), // ✅ lasts “forever”
};

export interface SessionPayload {
  username: string;
  firstname: string;
  lastname: string;
  imageUrl: string;
  userId: string;
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
}

// ✅ Create session — store tokens in cookie
export async function createSession(data: SessionPayload) {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify(data);

  cookieStore.set(COOKIE_NAME, sessionData, COOKIE_OPTIONS); // ✅ Added options
  return data;
}

// ✅ Get session — read from cookie
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionPayload;
  } catch (err) {
    console.error('Failed to parse session cookie:', err);
    return null;
  }
}

// ✅ Delete session — remove cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ✅ Update session — merge new tokens and persist again
export async function updateSession(
  request: NextRequest,
  newTokens: Partial<SessionPayload>
) {
  const cookieStore = await cookies();
  const current = cookieStore.get(COOKIE_NAME)?.value;

  if (!current) return null;

  const payload = JSON.parse(current);
  const updated = { ...payload, ...newTokens };

  cookieStore.set(COOKIE_NAME, JSON.stringify(updated), COOKIE_OPTIONS);

  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, JSON.stringify(updated), COOKIE_OPTIONS);
  return response;
}
