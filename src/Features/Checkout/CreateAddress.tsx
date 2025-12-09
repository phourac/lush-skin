'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { useRequest } from 'ahooks';
import ADDRESS_API from 'api/Address';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useAddressContext } from '@/contexts/AddressContext';

import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import ErrDialog, { IErrDialogRef } from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '300px',
};

interface IForm {
  ownerName: string;
  ownerPhone: string;
  addrNote: string;
  addrType: string;
  coords: { lat: number; lng: number };
  detail: Record<string, any>;
}

interface ChooseAddress {
  onClose: () => void;
  handleClickOnMap: () => void;
  refresh: () => void;
  onSelect: (id: number) => void;
}

function CreateAddress({
  onClose,
  handleClickOnMap,
  refresh,
  onSelect,
}: ChooseAddress) {
  const t = useTranslations('profile');
  const error = useRef<IErrDialogRef>(null);

  const listAddress = [
    {
      name: t('Home'),
      value: 'HOME',
      image: '/assets/home.svg',
      image_active: '/assets/home-active.svg',
    },
    {
      name: t('Company'),
      value: 'WORK',
      image: '/assets/company.svg',
      image_active: '/assets/company-active.svg',
    },
    {
      name: t('School'),
      value: 'SCHOOL',
      image: '/assets/school.svg',
      image_active: '/assets/school-active.svg',
    },
    {
      name: t('Other'),
      value: 'OTHER',
      image: '/assets/location.svg',
      image_active: '/assets/location-active.svg',
    },
  ];

  const { control, handleSubmit, setValue, watch } = useForm<IForm>({
    defaultValues: { addrType: listAddress[0].value },
  });

  const {
    isLoaded,
    addressName,
    setAddressName,
    isCoordManuallySet,
    loadingGetplace,
  } = useAddressContext();

  const { run: runAddAddress, loading: loadingRunAddAddress } = useRequest(
    ADDRESS_API.addAddress,
    {
      manual: true,
      onSuccess: () => {
        refresh();
        onClose();
      },
      onError: (err) => {
        error.current?.open(err);
      },
    }
  );
  const { run: runUpdateAddress, loading: loadingRunUpdateAddress } =
    useRequest(ADDRESS_API.updateAddress, {
      manual: true,
      onSuccess: () => {
        refresh();
        onClose();
        onSelect(Number(addressId));
      },
      onError: (err) => {
        error.current?.open(err);
      },
    });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const newData: IForm = {
      ...data,
      detail: {},
      coords: {
        lat: addressName.coord.lat,
        lng: addressName.coord.lng,
      },
    };

    if (addressId) {
      runUpdateAddress({
        id: addressId,
        isPinned: true,
        ...newData,
      });
    } else {
      runAddAddress(newData);
    }
  };

  const searchParams = useSearchParams();

  const addressId = searchParams.get('addressId') || '';

  useEffect(() => {
    const name = searchParams.get('name');
    const phone = searchParams.get('phone');
    const note = searchParams.get('note');
    const type = searchParams.get('type');
    // const lat = searchParams.get('lat');
    // const lng = searchParams.get('lng');

    if (name) setValue('ownerName', name);
    if (phone) setValue('ownerPhone', phone);
    if (note) setValue('addrNote', note);
    if (type) setValue('addrType', type);

    // ❗ STOP if user already selected their own location
    if (isCoordManuallySet) return;

    // Only apply coord from URL if not overridden
    // if (lat && lng) {
    //   setAddressName((prev) => ({
    //     ...prev,
    //     coord: {
    //       lat: parseFloat(lat),
    //       lng: parseFloat(lng),
    //     },
    //   }));
    // }
  }, [
    searchParams,
    setValue,
    setAddressName,
    isCoordManuallySet, // depend on this
  ]);

  return (
    <>
      <ErrDialog ref={error} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative flex h-full flex-col'
      >
        {/* Sticky Header */}
        <div className='bg-paper sticky top-0 z-10 flex items-center justify-between py-3 md:py-4'>
          <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
            {t('Create New Address')}
          </h1>
          <button type='button' onClick={onClose} className='cursor-pointer'>
            {/* <IoClose className='text-grey-60' size={20} /> */}
            <Image src={'/assets/cancel.svg'} alt='' width={20} height={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex flex-1 flex-col gap-5 overflow-y-auto pb-10'>
          <div className='flex w-full flex-col gap-2 rounded-[12px] bg-white p-3 md:p-4'>
            <div className='relative w-full overflow-hidden rounded-xl'>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={addressName.coord}
                  zoom={15}
                  options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoomControl: false,
                    scrollwheel: false,
                    disableDefaultUI: true,
                  }}
                  onClick={handleClickOnMap}
                >
                  <Marker
                    position={addressName.coord}
                    icon={{
                      url: `/assets/pin.svg`,
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                </GoogleMap>
              )}
            </div>

            <div className='flex flex-row gap-8 py-2'>
              <div>
                <p className='font-bloc text-grey-60 text-[14px] font-normal'>
                  {t('Address')}
                </p>
              </div>
              <div>
                {loadingGetplace ? (
                  <LoadingSpinner size={18} color='text-primary' />
                ) : (
                  <p className='font-bloc text-grey-pure_dark text-[14px] font-medium'>
                    {addressName.selectAddr || ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='flex w-full flex-col gap-2 rounded-[12px] bg-white p-3 md:p-4'>
            <div>
              <div className='flex flex-col items-center md:flex-row md:gap-6'>
                <div className='flex w-full flex-col gap-2 py-1'>
                  <div>
                    <p className='text-typography-base text-[15px] font-normal'>
                      {t('Receiver Name')}
                      <span className='text-typography-error'>*</span>
                    </p>
                  </div>
                  <div>
                    <Controller
                      name='ownerName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field, formState: { errors } }) => {
                        return (
                          <>
                            <CusInput
                              className='h-[48px]'
                              type='text'
                              placeholder={t('Add Name') + '...'}
                              error={!!errors.ownerName}
                              {...field}
                            />
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className='flex w-full flex-col gap-2 py-1'>
                  <div>
                    <p className='text-typography-base text-[15px] font-normal'>
                      {t('Phone Number')}{' '}
                      <span className='text-typography-error'>*</span>
                    </p>
                  </div>
                  <div>
                    <Controller
                      name='ownerPhone'
                      control={control}
                      rules={{ required: true }}
                      render={({ field, formState: { errors } }) => {
                        return (
                          <>
                            <CusInput
                              className='h-[48px]'
                              type='text'
                              placeholder={t('Add Phone Number') + '...'}
                              error={!!errors.ownerPhone}
                              {...field}
                            />
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 py-1'>
                <div>
                  <p className='text-typography-base text-[15px] font-normal'>
                    {t('Address Note')}
                  </p>
                </div>
                <div>
                  <Controller
                    name='addrNote'
                    control={control}
                    render={({ field, formState: { errors } }) => {
                      return (
                        <>
                          <CusInput
                            className='h-[48px]'
                            type='text'
                            placeholder={t('Add Address Note') + '...'}
                            error={!!errors.addrNote}
                            {...field}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-3 py-1'>
                <div>
                  <p>{t('Address type')}</p>
                </div>
                <div>
                  <div className='flex gap-4 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden'>
                    {listAddress.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setValue('addrType', item.value);
                        }}
                        className={`h-[92px] w-full gap-2 rounded-xl border-[1px] bg-white p-4 ${watch('addrType') === item.value ? 'border-primary' : 'border-grey-checkbox'}`}
                      >
                        <Controller
                          defaultValue={listAddress[0].name}
                          name='addrType'
                          control={control}
                          render={({ field }) => {
                            return (
                              <div
                                className='flex flex-col items-center gap-2'
                                onClick={() => {
                                  field.onChange(item.value);
                                }}
                              >
                                <div className='relative h-[27px] w-[29px]'>
                                  <Image
                                    src={
                                      watch('addrType') === item.value
                                        ? item.image_active
                                        : item.image
                                    }
                                    alt=''
                                    fill
                                  />
                                </div>
                                <div>
                                  <p className='font-bloc text-grey-80 text-[14px] font-normal'>
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className='bg-paper sticky bottom-0 z-10 pb-4'>
          <ButtonBase
            type='button'
            onClick={handleSubmit(onSubmit)}
            className='h-[48px] w-full rounded-full px-4 py-2'
          >
            {loadingRunAddAddress || loadingRunUpdateAddress ? (
              <div className='flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : (
              t('Confirm Address')
            )}
          </ButtonBase>
        </div>
      </form>
    </>
  );
}

export default CreateAddress;
