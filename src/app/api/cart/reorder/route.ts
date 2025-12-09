import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId is required' },
        { status: 400 }
      );
    }

    // 🧠 Ensure FetchServer returns parsed JSON
    const data = await FetchServer(API_ROUTE.reoder.replace(':id', orderId), {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      auth: true,
    });

    // ✅ Check if the request succeeded (based on your FetchServer behavior)
    if (data?.error || (data?.status ?? 0) >= 400) {
      return NextResponse.json(
        {
          error: data?.message || 'Failed to reorder product',
        },
        { status: data?.status || 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Added successfully',
        ...data, // ✅ Spread the data directly instead of nesting it
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Add to cart error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ?? 'An unexpected error occurred while reordering',
      },
      { status: 500 }
    );
  }
}
