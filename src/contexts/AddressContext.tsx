'use client';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { useRequest } from 'ahooks';
import ADDRESS_API from 'api/Address';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useSearchParams } from 'next/navigation';

import { MAP } from '@/utils/map-data-util';

// --------------------
// Types
// --------------------
export interface ICoord {
  lat: number;
  lng: number;
}

export interface ILocation {
  coord: ICoord;
  selectAddr?: number | string;
}

export interface IAddressContext {
  location: ILocation;
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
  addressName: ILocation;
  setAddressName: React.Dispatch<React.SetStateAction<ILocation>>;
  isLoaded: boolean;
  setIsCoordManuallySet: React.Dispatch<React.SetStateAction<boolean>>;
  isCoordManuallySet: boolean;
  loadingGetplace: boolean;
}

// --------------------
// Default state
// --------------------
const defaultLocation: ILocation = {
  coord: MAP.defaultLocation,
};

// --------------------
// Context
// --------------------
const AddressContext = createContext<IAddressContext>({
  location: defaultLocation,
  setLocation: () => {},
  addressName: defaultLocation,
  setAddressName: () => {},
  isCoordManuallySet: false,
  setIsCoordManuallySet: () => {},
  isLoaded: false,
  loadingGetplace: false,
});

// --------------------
// Wrapper Component
// --------------------
const libraries: Libraries = ['places'];

export function AddressWrapper({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<ILocation>(defaultLocation);
  const [addressName, setAddressName] = useState<ILocation>(defaultLocation);
  const [isCoordManuallySet, setIsCoordManuallySet] = useState(false);
  const searchParams = useSearchParams();
  const queryAddress = searchParams.get('address');
  // 🧠 Persist location in cookies (optional)

  // 🗺️ Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
    libraries,
  });

  const { run: runGetPlace, loading: loadingGetplace } = useRequest(
    () =>
      ADDRESS_API.getPlace({
        lat: addressName.coord.lat,
        lng: addressName.coord.lng,
      }),
    {
      manual: true,

      onSuccess: (data) => {
        setAddressName((prev) => ({
          ...prev,
          selectAddr: data.data.results[0].formatted_address,
        }));
      },
    }
  );
  const lastFetchedCoord = React.useRef<ICoord | null>(null);

  useEffect(() => {
    if (!queryAddress) return;

    const { lat, lng } = addressName.coord;

    if (!lat || !lng) return;

    if (
      lastFetchedCoord.current &&
      lastFetchedCoord.current.lat === lat &&
      lastFetchedCoord.current.lng === lng
    ) {
      return;
    }

    lastFetchedCoord.current = { lat, lng };

    runGetPlace();
  }, [
    queryAddress,
    addressName.coord.lat,
    addressName.coord.lng,
    addressName.coord,
    runGetPlace,
  ]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation({ coord, selectAddr: 'Current Location' });
          setAddressName({ coord, selectAddr: 'Current Location' });

          // if (!selecLocation) {
          //   setSelecLocation({ coord, selectAddr: 'Current Location' });
          // }
        },
        () => {
          // console.error(error.message);
          setLocation({
            coord: MAP.defaultLocation,
            selectAddr: 'Can not get current location',
          });
          alert('Please allow location access.');
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
    }
  }, []);

  return (
    <AddressContext.Provider
      value={{
        location,
        setLocation,
        addressName,
        setAddressName,
        isLoaded,
        isCoordManuallySet,
        setIsCoordManuallySet,
        loadingGetplace,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

// --------------------
// Hook
// --------------------
export function useAddressContext() {
  return useContext(AddressContext);
}
