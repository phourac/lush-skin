import { deleteSession, getSession } from '@/actions/auth';

import AccountLayoutClient from './AccountLayoutClient';

async function AccountLayout() {
  async function handleSignOut() {
    'use server';
    await deleteSession();
  }

  const session = await getSession();

  return (
    <AccountLayoutClient handleSignOut={handleSignOut} session={session} />
  );
}

export default AccountLayout;
