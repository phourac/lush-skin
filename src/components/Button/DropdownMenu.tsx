'use client';

import React, { Fragment } from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

interface DropdownMenuProps {
  label?: string; // e.g. "Sort By"
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  className?: string; // customize wrapper
  buttonClassName?: string; // customize button
  menuClassName?: string; // customize menu
  optionClassName?: string; // customize each option
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  selected,
  onChange,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  optionClassName = '',
}) => {
  return (
    <Menu as='div' className={`relative ${className}`}>
      {({ open }) => (
        <>
          <MenuButton
            className={`flex items-center text-[15px] leading-[140%] tracking-[-2%] focus:outline-none ${buttonClassName}`}
          >
            {label && (
              <span className='text-typography-secondary mr-1'>{label}</span>
            )}
            <span className='text-typography-base font-medium'>{selected}</span>
            <svg
              className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </MenuButton>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='transform opacity-0 translate-y-1'
            enterTo='transform opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='transform opacity-100 translate-y-0'
            leaveTo='transform opacity-0 translate-y-1'
          >
            <MenuItems
              className={`ring-border absolute right-0 z-10 mt-2 w-[200px] origin-top-right overflow-hidden rounded-xl bg-white shadow-xl ring-1 focus:outline-none ${menuClassName}`}
            >
              <div className='p-2'>
                {options.map((option, idx) => (
                  <MenuItem key={idx}>
                    {({ active }) => (
                      <button
                        onClick={() => onChange(option)}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 ${
                          active
                            ? 'text-primary bg-gray-50'
                            : 'text-typography-base'
                        } ${optionClassName}`}
                      >
                        {option}
                        {selected === option && (
                          <svg
                            className='text-primary h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropdownMenu;
