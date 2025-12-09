import { NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryIds = searchParams.get('categoryIds') || undefined;
    const similarProductId = searchParams.get('similarProductId') || undefined;
    const hasDiscount = searchParams.get('hasDiscount') || undefined;
    const slug = searchParams.get('slug') || undefined;
    const search = searchParams.get('search') || undefined;
    const page = searchParams.get('page') || undefined;
    const pageSize = searchParams.get('pageSize') || undefined;

    const params = {
      categoryIds,
      hasDiscount,
      slug,
      search,
      page,
      pageSize,
      similarProductId,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== ''
      )
    ) as Record<string, string | number | boolean>;

    const data = await FetchServer<IProducts.IProductRes>(
      API_ROUTE.guestProduct,
      {
        method: 'GET',
        params: filteredParams,
        auth: false,
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('❌ check', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.status || 500 }
    );
  }
}
