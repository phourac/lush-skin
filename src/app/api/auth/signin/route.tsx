import { createSession } from '@/actions/auth';

import { NextRequest, NextResponse } from 'next/server';

import { FetchServer } from '@/utils/fetch-util';
import { API_ROUTE } from '@/utils/route-utils';

export async function POST(request: NextRequest) {
  try {
    const { username, password, uuid } = await request.json();

    if (!username || !password || !uuid) {
      return NextResponse.json(
        { error: 'Email password and uuid  are required' },
        { status: 400 }
      );
    }

    const data = await FetchServer<IAuth.ISignIn>(API_ROUTE.signin, {
      method: 'POST',
      body: JSON.stringify({ username, password, uuid }),
      auth: false,
    });

    const tokens = data.data; // contains accessToken + refreshToken

    await createSession({
      username: tokens.user.username,
      imageUrl: tokens.user.userInfo.imageUrl,
      firstname: tokens.user.userInfo.firstname,
      lastname: tokens.user.userInfo.lastname,
      isLogin: true,
      userId: tokens.user.userInfo.id.toString(), // or replace with real userId if available
      accessToken: tokens.tokens.accessToken,
      refreshToken: tokens.tokens.refreshToken,
    });

    return NextResponse.json(
      { success: true, message: 'Signed in successfully', tokens },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Sign-in error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.status || 500 }
    );
  }
}
