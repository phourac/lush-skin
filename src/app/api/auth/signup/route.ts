import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, username, password } = await request.json();

    // Basic validation
    if (!firstname || !lastname || !username || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Call the real sign-up API via reusable FetchServer
    const data = await FetchServer<IAuth.ISignUp>(API_ROUTE.signup, {
      method: 'POST',
      body: JSON.stringify({ firstname, lastname, username, password }),
      auth: false,
    });

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
