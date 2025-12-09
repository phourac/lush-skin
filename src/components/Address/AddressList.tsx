'use client';

import ChooseAddressOnMap from 'Features/Checkout/ChooseAddressOnMap';
import CreateAddress from 'Features/Checkout/CreateAddress';
import { useRequest } from 'ahooks';
import ADDRESS_API from 'api/Address';
import { useAddress } from 'hooks/useAddress';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useAddressContext } from '@/contexts/AddressContext';

import ButtonBase from '@/components/Button/ButtonBase';
import EmptyData from '@/components/EmptyData';

import { MAP } from '@/utils/map-data-util';

import ConfirmDialog, { IConfirmDialogRef } from '../Dialog/ConfirmDialog';
import CusDialog from '../Dialog/CusDialog';
import ErrDialog, { IErrDialogRef } from '../Dialog/ErrorDialog';
import AddressCardSkeleton from '../Skeleton/AddressCardSkeleton';

interface AddressListProps {
  selectedId?: number;
  onSelect: (id: number) => void;
  onOpenDialog: (key: string, value: string, id?: number) => void;
  title: string;
}

/* -------------------------------------------
   Address Card
-------------------------------------------- */
const AddressCard = React.memo(
  ({
    addr,
    isSelected,
    onSelect,
    onOpenDialog,
    refresh,
    runUpdateAddress,
  }: {
    addr: IAddress.IAddressResData;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onOpenDialog: (key: string, value: string, id?: number) => void;
    refresh: () => void;
    runUpdateAddress: (data: {
      id: string;
      isPinned: boolean;
      ownerName: string;
      ownerPhone: string;
      addrNote: string;
      addrType: string;
      coords: {
        lat: number;
        lng: number;
      };
      detail: Record<string, unknown>;
    }) => void;
  }) => {
    const t = useTranslations('profile');
    const dialogRef = useRef<IConfirmDialogRef>(null);
    const errorDelete = useRef<IErrDialogRef>(null);

    const { run: runDelete, loading: loadingDelete } = useRequest(
      ADDRESS_API.deleteAddress,
      {
        manual: true,
        onSuccess: () => {
          refresh();
        },
        onError: (err) => {
          errorDelete.current?.open(err);
        },
      }
    );

    return (
      <>
        <ErrDialog ref={errorDelete} />
        <ConfirmDialog ref={dialogRef} loading={loadingDelete} />

        <div
          onClick={() => {
            runUpdateAddress({
              addrNote: addr.addrNote,
              id: addr.id.toString(),
              isPinned: true,
              addrType: addr.addrType,
              ownerName: addr.ownerName,
              ownerPhone: addr.ownerPhone,
              coords: addr.coords,
              detail: {},
            });
            onSelect(addr.id);
          }}
          className={`${
            isSelected ? 'border-primary' : 'border-border'
          } relative flex w-full cursor-pointer items-start gap-4 rounded-[16px] border-[2px] p-4 transition-colors`}
        >
          <Image
            src={
              isSelected
                ? '/assets/checkmark-circle-active.svg'
                : '/assets/checkmark-circle.svg'
            }
            alt='Selected indicator'
            width={18}
            height={18}
          />

          <div className='space-y-2 text-[15px]'>
            <h1 className='font-semibold'>
              {addr.addrType} • {addr.ownerName}
            </h1>
            <p>{addr.ownerPhone}</p>
            <p>{addr.addrNote}</p>
          </div>

          <div
            className='absolute top-4 right-4 flex items-center gap-4'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Edit */}
            <button
              type='button'
              className='flex cursor-pointer items-center gap-2'
              onClick={() => onOpenDialog('address', '1', addr.id)}
            >
              <Image src='/assets/pen.svg' alt='Edit' width={11} height={11} />
              <span className='text-[15px] font-medium'>{t('Edit')}</span>
            </button>

            {/* Delete */}
            {!isSelected && (
              <button
                type='button'
                className='flex cursor-pointer items-center gap-2'
                onClick={() => {
                  dialogRef.current?.open(
                    'Do you really want to delete?',
                    () => {
                      runDelete({ id: addr.id.toString() });
                    }
                  );
                }}
              >
                <Image
                  src='/assets/delete.svg'
                  alt='Delete'
                  width={11}
                  height={11}
                />
                <span className='text-[15px] font-medium'>{t('Delete')}</span>
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
);

AddressCard.displayName = 'AddressCard';

/* -------------------------------------------
   Main Address List
-------------------------------------------- */
const AddressList: React.FC<AddressListProps> = ({
  selectedId,
  onSelect,
  onOpenDialog,
  title,
}) => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('address');
  const { onClose } = useAddress();
  const isDialogOpen = searchParam === '1' || searchParam === '2';
  const t = useTranslations('profile');
  const { setAddressName } = useAddressContext();

  const {
    data,
    refresh,
    loading,
    error: errorList,
  } = useRequest(() => ADDRESS_API.getAddress({ page: 1, pageSize: 1000 }));

  const errorUpdate = useRef<IErrDialogRef>(null);

  const addressList = data?.data;

  const { run: runUpdateAddress } = useRequest(ADDRESS_API.updateAddress, {
    manual: true,
    onSuccess: () => {},
    onError: (err) => {
      errorUpdate.current?.open(err);
    },
  });

  /* 🔥 Auto-select pinned address on first load only */
  useEffect(() => {
    if (!addressList || !addressList.length) return;
    if (selectedId) return;

    const pinned = addressList.find((a) => a.isPinned);

    if (pinned) {
      onSelect(pinned.id);
    } else if (addressList.length === 1) {
      runUpdateAddress({
        addrNote: addressList[0].addrNote,
        id: addressList[0].id.toString(),
        isPinned: true,
        addrType: addressList[0].addrType,
        ownerName: addressList[0].ownerName,
        ownerPhone: addressList[0].ownerPhone,
        coords: addressList[0].coords,
        detail: {},
      });
      onSelect(addressList[0].id);
    }
  }, [addressList, selectedId, onSelect, runUpdateAddress]);

  const renderedList = React.useMemo(() => {
    if (addressList?.length === 0)
      return <EmptyData description='No address yet.' />;

    return addressList?.map((addr) => (
      <AddressCard
        runUpdateAddress={runUpdateAddress}
        key={addr.id}
        addr={addr}
        isSelected={selectedId === addr.id}
        onSelect={onSelect}
        onOpenDialog={onOpenDialog}
        refresh={refresh}
      />
    ));
  }, [
    addressList,
    selectedId,
    onSelect,
    onOpenDialog,
    refresh,
    runUpdateAddress,
  ]);

  const renderSkeletonList = () => (
    <div className='mt-6 flex w-full flex-col items-center gap-6'>
      {Array.from({ length: addressList?.length || 3 }).map((_, i) => (
        <AddressCardSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <>
      <ErrDialog ref={errorUpdate} />

      <div className='w-full'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
            {t(title)}
          </h1>

          <ButtonBase
            type='button'
            iconSrc='/assets/add.svg'
            iconPosition='left'
            className='px-4 whitespace-nowrap'
            onClick={() => {
              onOpenDialog('address', '1');

              if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const coord = {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                    };
                    setAddressName({
                      coord,
                      selectAddr: 'Current Location',
                    });
                  },
                  () => {
                    setAddressName({
                      coord: MAP.defaultLocation,
                      selectAddr: 'Cannot get current location',
                    });
                  }
                );
              }
            }}
          >
            {t('Create New Address')}
          </ButtonBase>
        </div>

        {/* Error */}
        {errorList && (
          <EmptyData
            title={`Error ${(errorList as any).status}`}
            description={errorList.message}
            btnTitle='Refresh'
            onRefresh={() => refresh()}
          />
        )}

        {/* Loading Skeleton */}
        {!errorList && loading && (
          <div className='mt-6 flex flex-col items-center gap-6'>
            {renderSkeletonList()}
          </div>
        )}

        {/* No Data */}
        {!errorList && !loading && addressList?.length === 0 && (
          <EmptyData
            title='No Data'
            description='There is no address yet'
            btnTitle='Create Address'
            onRefresh={() => onOpenDialog('address', '1')}
          />
        )}

        {/* Address List */}
        {!errorList && !loading && (addressList?.length ?? 0) > 0 && (
          <div className='mt-6 flex flex-col items-center gap-6'>
            {renderedList}
          </div>
        )}
      </div>

      {/* Dialog */}
      <CusDialog
        isOpen={isDialogOpen}
        onClose={onClose}
        title=''
        buttonText='Ok'
        loading={false}
        direction='bottom'
        height='h-[calc(100vh-110px)]'
        className='w-[534px] rounded-2xl'
      >
        <div className='px-3 md:px-5'>
          {searchParam === '1' ? (
            <CreateAddress
              onSelect={onSelect}
              refresh={refresh}
              onClose={onClose}
              handleClickOnMap={() => onOpenDialog('address', '2')}
            />
          ) : (
            searchParam === '2' && <ChooseAddressOnMap onClose={onClose} />
          )}
        </div>
      </CusDialog>
    </>
  );
};

export default React.memo(AddressList);
