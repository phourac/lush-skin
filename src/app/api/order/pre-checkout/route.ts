import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { cartIds, couponCode, cusAddressId } = await request.json();

    // ✅ Validation (couponCode is optional)
    if (
      !Array.isArray(cartIds) ||
      cartIds.length === 0 ||
      cartIds.some((id) => typeof id !== 'number')
    ) {
      return NextResponse.json(
        { error: 'cartIds must be a non-empty array of numbers' },
        { status: 400 }
      );
    }

    // Prepare payload
    const payload: any = { cartIds };
    if (couponCode) payload.couponCode = couponCode; // optional
    if (cusAddressId) payload.cusAddressId = cusAddressId; // optional

    // Call backend
    const backendRes = await FetchServer(API_ROUTE.preCheckoutByCart, {
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
