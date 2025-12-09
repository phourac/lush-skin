import { NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code') || undefined;

    const params = { code };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== ''
      )
    ) as Record<string, string | number | boolean>;

    const data = await FetchServer<IProducts.IProductRes>(API_ROUTE.coupon, {
      method: 'GET',
      params: filteredParams,
      auth: true,
    });

    // ⛔ DON'T force 200 — use backend response status
    const status = data?.status ?? 200;

    return NextResponse.json(data, { status });
  } catch (error: any) {
    console.error('❌ check', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.status || 500 }
    );
  }
}
