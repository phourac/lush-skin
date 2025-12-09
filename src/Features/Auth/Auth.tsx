'use client';

import React, { useState } from 'react';

import CreateNewPassword from './CreateNewPassword';
import ResetPassword from './ResetPassword';
import SelectAccount from './SelectAccount';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Auth() {
  const [accounts, setAccounts] = useState<IAuth.ICheck>();
  const [selectedAcc, setSelectedAcc] = useState<IAuth.ICheckData>();
  const [isGetOtp, setIsGetOpt] = useState(false);

  const [getPhone] = useState('');

  return (
    <>
      {/* <CheckAccount setAccounts={setAccounts} setGetPhone={setGetPhone} /> */}
      <SelectAccount accounts={accounts} setSelectedAcc={setSelectedAcc} />
      <SignIn selectedAcc={selectedAcc} setAccounts={setAccounts} />

      <SignUp getPhone={getPhone} />

      <>
        <ResetPassword setIsGetOpt={setIsGetOpt} isGetOtp={isGetOtp} />
        <CreateNewPassword setIsGetOpt={setIsGetOpt} isGetOtp={isGetOtp} />
      </>
    </>
  );
}
export default Auth;
