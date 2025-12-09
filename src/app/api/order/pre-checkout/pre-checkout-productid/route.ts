import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { products, couponCode, cusAddressId } = await request.json();

    if (
      !Array.isArray(products) ||
      products.length === 0 ||
      products.some(
        (item) =>
          typeof item.productId !== 'number' ||
          typeof item.qty !== 'number' ||
          typeof item.productVariantId !== 'number'
      )
    ) {
      return NextResponse.json(
        {
          error:
            'products must be array of { productId, qty, productVariantId }',
        },
        { status: 400 }
      );
    }
    const payload: any = {
      products,
    };

    if (couponCode) {
      payload.couponCode = couponCode;
    }
    if (cusAddressId) {
      payload.cusAddressId = cusAddressId;
    }

    // Call backend
    const backendRes = await FetchServer(API_ROUTE.preCheckoutProductId, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: true,
    });

    const status = backendRes?.status ?? 500;

    if (status >= 200 && status < 300) {
      return NextResponse.json({ ...backendRes, status: 200 }, { status: 200 });
    }

    return NextResponse.json(
      {
        ...backendRes,
        error: backendRes.message || backendRes.error || 'Backend error',
      },
      { status }
    );
  } catch (error: any) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
