import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function PATCH(request: NextRequest) {
  try {
    const {
      id,
      ownerName,
      ownerPhone,
      addrNote,
      addrType,
      coords: { lat, lng },
      detail,
      isPinned,
    } = await request.json();

    // Basic validation for required fields
    if (!isPinned || !id || !ownerName || !ownerPhone || !lat || !lng) {
      return NextResponse.json(
        {
          error: 'isPinned, id, ownerName, ownerPhone, lat, lng are required',
        },
        { status: 400 }
      );
    }

    // Send to backend API
    const data = await FetchServer(API_ROUTE.addressId.replace(':id', id), {
      method: 'PATCH',
      body: JSON.stringify({
        isPinned,
        ownerName,
        ownerPhone,
        addrNote,
        addrType,
        coords: { lat, lng },
        detail,
        id,
      }),
      auth: true,
    });

    // Error returned from FetchServer
    if (data?.error || (data?.status && data.status >= 400)) {
      return NextResponse.json(
        { error: data?.message || 'Failed to save address' },
        { status: data?.status || 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Saved successfully',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      {
        error: error?.message ?? 'Unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
