import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function PATCH(request: NextRequest) {
  try {
    const form = await request.formData();

    // Extract fields from FormData
    const imageFile = form.get('imageFile') as File | null;
    const username = form.get('username') as string | null;
    const phone = form.get('phone') as string | null;
    const email = form.get('email') as string | null;
    const firstname = form.get('firstname') as string | null;
    const lastname = form.get('lastname') as string | null;
    const dob = form.get('dob') as string | null;
    const gender = form.get('gender') as string | null;

    // Build a new FormData payload
    const payload = new FormData();

    if (imageFile) payload.append('imageFile', imageFile);
    if (username) payload.append('username', username);
    if (phone) payload.append('phone', phone);
    if (email) payload.append('email', email);
    if (firstname) payload.append('firstname', firstname);
    if (lastname) payload.append('lastname', lastname);
    if (dob) payload.append('dob', dob);
    if (gender) payload.append('gender', gender);

    // Send form-data to backend
    const data = await FetchServer(API_ROUTE.profile, {
      method: 'PATCH',
      body: payload,
      auth: true,
    });

    if (data?.error || (data?.status && data.status >= 400)) {
      return NextResponse.json(
        { error: data?.message || 'Failed to update data' },
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
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
