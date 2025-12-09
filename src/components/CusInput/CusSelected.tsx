'use client';

import clsx from 'clsx';
import React, { Fragment } from 'react';

import Image from 'next/image';

import { Listbox, Transition } from '@headlessui/react';

interface Option {
  label: string;
  value: string;
}

interface CusSelectedProps {
  options: Option[];
  value: Option | null; // ensure always Option or null
  onChange: (value: Option | null) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

const CusSelected: React.FC<CusSelectedProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  error = false,
  errorMessage,
}) => {
  return (
    <div className='w-full'>
      <Listbox value={value} onChange={onChange}>
        <div className='relative'>
          {/* Select Button */}
          <Listbox.Button
            className={clsx(
              'relative w-full cursor-pointer rounded-xl border py-2 pr-10 pl-4 text-left focus:outline-none',
              error ? 'border-typography-error' : 'border-border',
              'text-typography-base placeholder:text-typography-muted',
              className
            )}
          >
            <span
              className={clsx(
                'block truncate',
                !value ? 'text-typography-muted' : ''
              )}
            >
              {value ? value.label : placeholder}
            </span>

            {/* Dropdown arrow icon (SVG) */}
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <div className='relative h-[14px] w-[14px]'>
                <Image src={'/assets/arrow-down.svg'} alt='' fill />
              </div>
            </span>
          </Listbox.Button>

          {/* Dropdown Options */}
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='border-border absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg focus:outline-none'>
              {options.length === 0 && (
                <div className='p-2 text-sm text-gray-500'>No options</div>
              )}
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer py-2 pr-4 pl-10 select-none',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected ? 'font-medium' : 'font-normal'
                        )}
                      >
                        {option.label}
                      </span>

                      {/* Checkmark icon */}
                      {selected && (
                        <span className='text-primary absolute inset-y-0 left-0 flex items-center pl-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* Error message */}
      {error && errorMessage && (
        <p className='text-typography-error mt-[6px] text-sm'>{errorMessage}</p>
      )}
    </div>
  );
};

export default CusSelected;
