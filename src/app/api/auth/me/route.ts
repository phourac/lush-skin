import { getSession } from '@/actions/auth';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get fresh user data from database
    // const user = db.findUserById(session.userId);

    // if (!user) {
    //   return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // }

    // return NextResponse.json({
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //     createdAt: user.createdAt,
    //   },
    // });
  } catch (error) {
    console.error('Get session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
