import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required' },
        { status: 400 }
      );
    }

    // 🧠 Ensure FetchServer returns parsed JSON
    const data = await FetchServer(API_ROUTE.favorite, {
      method: 'POST',
      body: JSON.stringify({ productId }),
      auth: true,
    });

    // ✅ Check if the request succeeded (based on your FetchServer behavior)
    if (data?.error || (data?.status ?? 0) >= 400) {
      return NextResponse.json(
        {
          error: data?.message || 'Failed to add product to favorite',
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
    console.error('❌ Add favorite error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ??
          'An unexpected error occurred while adding favorite',
      },
      { status: 500 }
    );
  }
}
