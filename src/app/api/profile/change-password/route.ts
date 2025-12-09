import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function PUT(request: NextRequest) {
  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'oldPassword, newPassword are required' },
        { status: 400 }
      );
    }

    // 🧠 Ensure FetchServer returns parsed JSON
    const data = await FetchServer(API_ROUTE.changePassword, {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
      auth: true,
    });

    // ✅ Check if the request succeeded (based on your FetchServer behavior)
    if (data?.error || (data?.status ?? 0) >= 400) {
      return NextResponse.json(
        {
          error: data?.message || 'Failed to update product to cart',
        },
        { status: data?.status || 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Updated successfully',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Update to cart error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ??
          'An unexpected error occurred while updating to cart',
      },
      { status: 500 }
    );
  }
}
