import { deleteSession } from '@/actions/auth';

import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await deleteSession();

    return NextResponse.json(
      { success: true, message: 'Signed out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
