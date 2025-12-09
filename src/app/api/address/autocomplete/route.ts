import { NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get('query') || undefined;

    const params = {
      query,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== ''
      )
    ) as Record<string, string | number | boolean>;
    const data = await FetchServer<IAddress.IPlaceAutoCompleteRes>(
      API_ROUTE.placeAutoComplete,
      {
        method: 'GET',
        params: filteredParams,
        auth: true,
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
