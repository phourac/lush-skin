'use client';

import { useAddress } from 'hooks/useAddress';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import AddressList from '@/components/Address/AddressList';

interface IAddress {
  addressId: number;
}

const Address = () => {
  const { watch, setValue, control } = useForm<IAddress>();

  const { handleOpenAddressDialog } = useAddress();

  return (
    <Controller
      name='addressId'
      control={control}
      render={({}) => (
        <AddressList
          selectedId={watch('addressId')}
          onSelect={(id) => {
            setValue('addressId', id);
          }}
          onOpenDialog={handleOpenAddressDialog}
          title='Select Delivery Address'
        />
      )}
    />
  );
};

export default Address;
