import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const {
      ownerName,
      ownerPhone,
      addrNote,
      addrType,
      coords: { lat, lng },
      detail,
    } = await request.json();

    // Basic validation for required fields
    if (!ownerName || !ownerPhone || !lat || !lng) {
      return NextResponse.json(
        { error: 'ownerName, ownerPhone, lat, lng are required' },
        { status: 400 }
      );
    }

    // Send to backend API
    const data = await FetchServer(API_ROUTE.address, {
      method: 'POST',
      body: JSON.stringify({
        ownerName,
        ownerPhone,
        addrNote,
        addrType,
        coords: { lat, lng },
        detail,
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
