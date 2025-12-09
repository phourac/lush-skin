import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

/* -------------------------
   Request Body Types
-------------------------- */
interface IProductItem {
  productId: number;
  qty: number;
  productVariantId: number;
}

interface ICoordinate {
  lat: number;
  lng: number;
}

interface ICheckoutRequest {
  paymentMethodId: number;
  cusRemark?: string;
  cusMarker?: string;
  cusPaymentReceptUrl?: string;
  couponCode?: string;
  cusCoordinate?: ICoordinate;
  products: IProductItem[];
  cusAddressId: number;
}

/* -------------------------
        Route Handler
-------------------------- */
export async function POST(request: NextRequest) {
  try {
    const data: ICheckoutRequest = await request.json();

    const {
      paymentMethodId,
      cusRemark,
      cusMarker,
      cusPaymentReceptUrl,
      couponCode,
      cusCoordinate,
      products,
      cusAddressId,
    } = data;

    // --- Validate: products is required ---
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'products must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate each product object
    const invalidProduct = products.some(
      (p) =>
        typeof p.productId !== 'number' ||
        typeof p.qty !== 'number' ||
        typeof p.productVariantId !== 'number'
    );

    if (invalidProduct) {
      return NextResponse.json(
        {
          error:
            'Each product must include productId, qty, productVariantId (number)',
        },
        { status: 400 }
      );
    }

    // --- Prepare payload ---
    const payload: any = {
      paymentMethodId,
      products,
      cusAddressId,
    };

    if (cusRemark) payload.cusRemark = cusRemark;
    if (cusMarker) payload.cusMarker = cusMarker;
    if (cusPaymentReceptUrl) payload.cusPaymentReceptUrl = cusPaymentReceptUrl;
    if (couponCode) payload.couponCode = couponCode;
    if (cusCoordinate) payload.cusCoordinate = cusCoordinate;

    // --- Send to backend ---
    const backendRes = await FetchServer(API_ROUTE.placeOrder, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: true,
    });

    // Success
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
