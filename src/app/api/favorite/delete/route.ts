import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'productId are required' },
        { status: 400 }
      );
    }

    // 🔗 Append ids to your external API URL
    const apiUrl = `${API_ROUTE.favoriteRemove.replace(':productId', productId)}`;

    const data = await FetchServer(apiUrl, {
      method: 'DELETE',
      auth: true,
    });

    // ✅ Check for error or status
    if (data?.error || (data?.status ?? 0) >= 400) {
      return NextResponse.json(
        {
          error: data?.message || 'Failed to delete product(s)',
        },
        { status: data?.status || 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Deleted successfully',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Delete cart error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ??
          'An unexpected error occurred while deleting favorite',
      },
      { status: 500 }
    );
  }
}
