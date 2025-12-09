'use client';

import { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  buttonText?: string;
  loading: boolean;
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  height?: string;
  topSpacing?: string;
  className?: string;
}

const CusDialog = ({
  isOpen,
  onClose,
  children,
  direction = 'center',
  height,
  topSpacing,
  className,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevent SSR mismatch
  const transitionClasses = {
    top: 'translate-y-[-100%]',
    bottom: 'translate-y-[100%]',
    left: 'translate-x-[-100%]',
    right: 'translate-x-[100%]',
    center: 'scale-95 opacity-0',
  };
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          onClose();
        }}
        className={'custom-dialog-panel'}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 z-[98] bg-black/25' />
        </Transition.Child>

        <div className={`fixed inset-0 z-[98] w-screen ${topSpacing}`}>
          <div
            className={`flex min-h-full items-center justify-center p-4 text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom={transitionClasses[direction]}
              enterTo='translate-x-0 translate-y-0 opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='translate-x-0 translate-y-0 opacity-100 scale-100'
              leaveTo={transitionClasses[direction]}
            >
              <Dialog.Panel
                key={isOpen ? 'dialog-open' : 'dialog-closed'}
                className={`custom-dialog-panel ${
                  height ? height : 'max-h-[90vh]'
                } no-scrollbar bg-paper transform overflow-y-auto overscroll-contain text-left align-middle shadow-xl transition-all ${className}`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CusDialog;
