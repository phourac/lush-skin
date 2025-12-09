import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function DELETE(request: NextRequest) {
  try {
    // ✅ Get the "ids" from the query string, e.g. /api/cart/delete?ids=123,456
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json({ error: 'ids are required' }, { status: 400 });
    }

    // 🔗 Append ids to your external API URL
    const apiUrl = `${API_ROUTE.removeCart}?ids=${encodeURIComponent(ids)}`;

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
          error?.message ?? 'An unexpected error occurred while deleting cart',
      },
      { status: 500 }
    );
  }
}
