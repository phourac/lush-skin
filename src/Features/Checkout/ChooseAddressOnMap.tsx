'use client';

import { GoogleMap } from '@react-google-maps/api';
import { useDebounce, useRequest } from 'ahooks';
import ADDRESS_API from 'api/Address';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { MdOutlineMyLocation } from 'react-icons/md';

import { useAddressContext } from '@/contexts/AddressContext';

import ButtonBase from '@/components/Button/ButtonBase';

import { DEFAULT_MAP_STYLE } from '@/utils/map-data-util';

// import markerIcon from '../../../public/assets/pin.svg';
import marker from '../../../public/assets/pin.svg';
import SearchBar from './SearchBarForMap';

interface IchooseAdd {
  onClose: () => void;
}

function ChooseAddressOnMap({ onClose }: IchooseAdd) {
  const { addressName, setAddressName, isLoaded } = useAddressContext();
  const [searchValue, setSearchValue] = useState('');

  const t = useTranslations('profile');
  const markerIconStyle: React.CSSProperties = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  const router = useRouter();
  // const markerIconUrlMap = markerIcon.src;
  const [mapref, setMapRef] = useState<any>();
  const [coord, setCoord] = useState<IAddress.ICoord | null>(null);
  // const [currentMarker, setCurrentMarker] = useState<IAddress.ICoord | null>(
  //   null
  // );
  const debouncedSearchValue = useDebounce(searchValue, { wait: 1000 });
  const { setIsCoordManuallySet } = useAddressContext();

  const {
    run: runSearchMap,
    // loading: loadingSaerchMap,
    data: dataSearchMap,
  } = useRequest(ADDRESS_API.placeAutoComplete, {
    manual: true,
    onSuccess: () => {
      // setOpenList(true);
    },
  });

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentCoord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // setCurrentMarker(currentCoord);

        // If addressName.coord is 0,0 or not set, use current location
        if (
          !addressName.coord ||
          (addressName.coord.lat === 0 && addressName.coord.lng === 0)
        ) {
          setCoord(currentCoord);
        } else {
          setCoord(addressName.coord);
        }
      },
      () => {
        alert(
          'Unable to retrieve your current location! Please allow location access.'
        );
        // Fallback to addressName.coord if available
        if (
          addressName.coord &&
          !(addressName.coord.lat === 0 && addressName.coord.lng === 0)
        ) {
          setCoord(addressName.coord);
        }
      }
    );
  };

  const handleCenterChange = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      if (newCenter) {
        const newLat = newCenter.lat();
        const newLng = newCenter.lng();

        // Only update if coordinates actually changed significantly (to avoid infinite loops)
        setCoord((prev) => {
          if (
            !prev ||
            Math.abs(prev.lat - newLat) > 0.0001 ||
            Math.abs(prev.lng - newLng) > 0.0001
          ) {
            return { lat: newLat, lng: newLng };
          }
          return prev;
        });
      }
    }
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;

        const newCoord = { lat: newLat, lng: newLng };

        // setCurrentMarker(newCoord);
        setCoord(newCoord);
        setAddressName((prev) => ({
          ...prev,
          coord: newCoord,
        }));

        if (mapref) {
          const newCenter = new google.maps.LatLng(newLat, newLng);
          mapref.panTo(newCenter);
        }
      },
      () => {
        alert(
          'Unable to retrieve your current location! Please allow location access.'
        );
      }
    );
  };

  const handleSave = () => {
    if (coord) {
      setAddressName((prev) => ({
        ...prev,
        coord,
      }));
      setIsCoordManuallySet(true);
      router.back();
    }
  };

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const { run: runPlaceMap } = useRequest(ADDRESS_API.placeId, {
    manual: true,
    onSuccess: (data) => {
      setCoord({
        lat: data.data[0].location.latitude,
        lng: data.data[0].location.longitude,
      });
      if (mapref) {
        const newCenter = new google.maps.LatLng(
          data.data[0].location.latitude,
          data.data[0].location.longitude
        );
        mapref.panTo(newCenter);
      }
    },
  });

  const handleSelectLocation = (place_id: string) => {
    const placeData = {
      place_id: place_id,
      key: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
    };
    runPlaceMap({ placeId: placeData.place_id });
  };

  useEffect(() => {
    const searchData = {
      input: debouncedSearchValue,
      region: 'kh',
      fields: 'formatted_address,name,rating,opening_hours,geometry',
      key: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
    };
    if (debouncedSearchValue) runSearchMap({ query: searchData.input });
  }, [debouncedSearchValue, runSearchMap]);

  const searchParams = useSearchParams();
  const addressId = searchParams?.get('addr_id');

  // Get the map center - use coord if available and valid, otherwise use a default or wait for current location
  const getMapCenter = () => {
    if (coord && coord.lat !== 0 && coord.lng !== 0) {
      return coord;
    }
    if (
      addressName.coord &&
      addressName.coord.lat !== 0 &&
      addressName.coord.lng !== 0
    ) {
      return addressName.coord;
    }
    // Default fallback (Phnom Penh center)
    return { lat: 11.5564, lng: 104.9282 };
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-paper sticky top-0 z-10 flex justify-between pt-3 md:pt-4'>
        <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
          {t('Create New Address')}
        </h1>
        <button onClick={onClose} className='cursor-pointer'>
          <Image src={'/assets/cancel.svg'} alt='' width={20} height={20} />
        </button>
      </div>
      <div className='relative overflow-hidden rounded-xl'>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{
              width: '100%',
              height: 'calc(100vh - 270px)',
            }}
            onLoad={handleOnLoad}
            onDragEnd={handleCenterChange}
            center={getMapCenter()}
            zoom={15}
            options={{
              styles: DEFAULT_MAP_STYLE,
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              gestureHandling: 'greedy',
            }}
          >
            <div className='absolute top-3 w-full px-3'>
              <SearchBar
                handleSearch={handleSearch}
                suggestions={dataSearchMap?.data[0].suggestions}
                selectLocation={handleSelectLocation}
              />
            </div>
            <Image
              src={marker.src}
              alt='Marker'
              style={markerIconStyle}
              width={30}
              height={30}
            />
            <div className='absolute right-3 bottom-[75px]'>
              <button
                className='cursor-pointer rounded-md bg-white p-3 shadow-lg shadow-gray-400/50'
                onClick={handleCurrentLocation}
              >
                <MdOutlineMyLocation />
              </button>
            </div>
          </GoogleMap>
        )}
      </div>

      <div className='bg-paper sticky bottom-0 z-10'>
        <ButtonBase
          onClick={handleSave}
          className='h-[48px] w-full rounded-full px-4 py-2'
        >
          {addressId
            ? `${t('Update')} ${t('Location')}`
            : `${t('Save')} ${t('Location')}`}
        </ButtonBase>
      </div>
    </div>
  );
}

export default ChooseAddressOnMap;
