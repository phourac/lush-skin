'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import { Dialog } from '@headlessui/react';

import ButtonBase from '../Button/ButtonBase';

interface IErrDialog {
  title?: string;
  onClose?: () => void;
}

export interface IErrDialogRef {
  open: (message: string | Error | any) => void;
  close: () => void;
}

const ErrDialog = forwardRef<IErrDialogRef, IErrDialog>(
  ({ title = 'Something went wrong', onClose: externalOnClose }, ref) => {
    const [open, setOpen] = useState(false);
    const [msgText, setMsgText] = useState<string>('Unknown error');

    const onClose = () => {
      externalOnClose?.();
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: (message) => {
        let parsed = 'Unknown error';

        // 🧩 Case 1: simple string
        if (typeof message === 'string') {
          parsed = message;

          // 🧩 Case 2: native Error object
        } else if (message instanceof Error) {
          parsed = message.message;

          // 🧩 Case 3: API response object (with nested message/error)
        } else if (message && typeof message === 'object') {
          const m = message;

          // Try common structures
          parsed =
            m.error ||
            m.message?.error ||
            m.message ||
            m.details?.message ||
            m.details ||
            JSON.stringify(m, null, 2);
        }

        setMsgText(String(parsed));
        setOpen(true);
      },
      close: onClose,
    }));

    return (
      <Dialog open={open} onClose={onClose} className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='w-full max-w-md rounded-lg bg-white shadow-xl'>
            <Dialog.Title className='px-6 pt-6 pb-4 text-lg font-medium text-gray-900'>
              {title}
            </Dialog.Title>
            <div className='px-6 py-4 break-words whitespace-pre-wrap text-gray-700'>
              {msgText}
            </div>
            <div className='flex justify-end px-6 py-4'>
              <ButtonBase className='bg-primary text-white' onClick={onClose}>
                OK
              </ButtonBase>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }
);

ErrDialog.displayName = 'ErrDialog';
export default ErrDialog;
