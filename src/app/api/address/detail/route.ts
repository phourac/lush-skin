import { NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id') || undefined;

    if (!id) {
      return NextResponse.json(
        { error: true, message: 'id is required', data: null },
        { status: 400 }
      );
    }

    const res = await FetchServer<IProducts.IProductRes>(
      API_ROUTE.addressId.replace(':id', id),
      {
        method: 'GET',
        auth: true,
      }
    );

    // 🔥 If API returns status > 201 → treat as error
    if (res?.status && res.status > 201) {
      throw {
        status: res.status,
        message: res.message || 'Unknown API error',
      };
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.error('❌ check', error);

    return NextResponse.json(
      {
        error: true,
        message: error?.message || 'Internal server error',
        data: null,
      },
      { status: error?.status || 500 }
    );
  }
}
