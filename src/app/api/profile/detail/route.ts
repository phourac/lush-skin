import { NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function GET() {
  try {
    const data = await FetchServer<IProducts.IProductRes>(API_ROUTE.profile, {
      method: 'GET',
      auth: true,
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
