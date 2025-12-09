// app/api/your-route/route.ts
import { NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, message: 'Missing username parameter' },
        { status: 400 }
      );
    }

    const data = await FetchServer<IAuth.ICheckData>(API_ROUTE.check, {
      method: 'GET',
      params: { username },
      auth: false,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('❌ check', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.status || 500 }
    );
  }
}
