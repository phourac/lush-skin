import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { productId, variantId, qty } = await request.json();

    if (!productId || !variantId || !qty) {
      return NextResponse.json(
        { error: 'productId, variantId, and qty are required' },
        { status: 400 }
      );
    }

    // 🧠 Ensure FetchServer returns parsed JSON
    const data = await FetchServer(API_ROUTE.cart, {
      method: 'POST',
      body: JSON.stringify({ productId, variantId, qty }),
      auth: true,
    });

    // ✅ Check if the request succeeded (based on your FetchServer behavior)
    if (data?.error || (data?.status ?? 0) >= 400) {
      return NextResponse.json(
        {
          error: data?.message || 'Failed to add product to cart',
        },
        { status: data?.status || 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Added successfully',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Add to cart error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ?? 'An unexpected error occurred while adding to cart',
      },
      { status: 500 }
    );
  }
}
