import Image from 'next/image';

import { FiSearch } from 'react-icons/fi';

import { useAddressContext } from '@/contexts/AddressContext';

import { useSearchBarForMap } from './useSearchBarForMap';

interface SearchBarProps {
  handleSearch: (e: any) => void;
  suggestions?: IAddress.Suggestion[] | undefined;
  selectLocation: (place_id: string) => void;
}

export default function SearchBar({
  handleSearch,
  suggestions = [],
  selectLocation,
}: SearchBarProps) {
  const {
    dropdownRef,
    handleSubmit,
    query,
    handleInputChange,
    setIsOpen,
    isOpen,
    setQuery,
  } = useSearchBarForMap({ handleSearch });
  const { setAddressName } = useAddressContext();

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <form onSubmit={handleSubmit} className='relative'>
        <div className='relative flex items-center'>
          <FiSearch className='text-typography-base absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <input
            className='border-border block w-full rounded-lg border bg-white p-4 pl-10 text-sm outline-none'
            placeholder='Search'
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim() !== '' && setIsOpen(true)}
          />
        </div>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className='border-border absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg'>
          <ul className='max-h-60 overflow-auto py-1'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className='flex cursor-pointer flex-row gap-2 px-4 py-2 hover:bg-gray-100'
                onClick={() => {
                  selectLocation(suggestion.placePrediction.placeId);
                  setIsOpen(false);
                  setQuery(suggestion.placePrediction.text.text);
                  setAddressName((prev) => ({
                    ...prev,
                    selectAddr: suggestion.placePrediction.text.text,
                  }));
                }}
              >
                <Image
                  src={`/assets/pin-location.svg`}
                  width={16}
                  height={16}
                  alt='icon-location'
                />
                {suggestion.placePrediction.text.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
