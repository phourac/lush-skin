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

    const res = await FetchServer<IProducts.IFavoriteDetail>(
      API_ROUTE.customerProductDetail.replace(':id', id),
      {
        method: 'GET',
        params: { id },
        auth: true,
      }
    );

    if (res?.status && res.status > 201) {
      throw {
        status: res.status,
        message: res.message || 'Unknown API error',
      };
    }

    // 🔥 Extract favorite info
    const isFav =
      Array.isArray(res?.data?.productFavorites) &&
      res.data.productFavorites.length > 0;

    // 🔥 Return transformed data
    return NextResponse.json(
      {
        status: 200,
        message: 'success',
        data: {
          isFav,
        },
      },
      { status: 200 }
    );
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
