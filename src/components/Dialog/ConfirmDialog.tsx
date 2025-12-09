'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import { Dialog } from '@headlessui/react';

import ButtonBase from '../Button/ButtonBase';
import LoadingSpinner from '../Loading/LoadingSpinner';

interface IConfirmDialog {
  title?: string;
  loading?: boolean; // ⭐ external loading
  onCancel?: () => void;
}

export interface IConfirmDialogRef {
  open: (message: string | Error | any, onConfirm?: () => void) => void;
  close: () => void;
}

const ConfirmDialog = forwardRef<IConfirmDialogRef, IConfirmDialog>(
  (
    { title = 'Are you sure?', loading = false, onCancel: externalOnCancel },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [msgText, setMsgText] = useState<string>('Confirm action?');
    const [onConfirmCallback, setOnConfirmCallback] = useState<
      null | (() => void)
    >(null);

    const handleClose = () => {
      if (loading) return; // prevent close while loading
      externalOnCancel?.();
      setOpen(false);
    };

    const handleConfirm = () => {
      if (loading) return;
      onConfirmCallback?.();
    };

    useImperativeHandle(ref, () => ({
      open: (message, callback) => {
        let parsed = 'Confirm action?';

        if (typeof message === 'string') {
          parsed = message;
        } else if (message instanceof Error) {
          parsed = message.message;
        } else if (message && typeof message === 'object') {
          const m = message;
          parsed =
            m.error ||
            m.message?.error ||
            m.message ||
            m.details?.message ||
            m.details ||
            JSON.stringify(m, null, 2);
        }

        setMsgText(String(parsed));
        setOnConfirmCallback(() => callback || null);
        setOpen(true);
      },
      close: handleClose,
    }));

    return (
      <Dialog open={open} onClose={handleClose} className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='w-full max-w-md rounded-lg bg-white shadow-xl'>
            <Dialog.Title className='px-6 pt-6 pb-4 text-lg font-medium text-gray-900'>
              {title}
            </Dialog.Title>

            <div className='px-6 py-4 break-words whitespace-pre-wrap text-gray-700'>
              {msgText}
            </div>

            <div className='flex justify-end gap-3 px-6 py-4'>
              <ButtonBase
                disabled={loading}
                className='bg-gray-200 text-gray-700 disabled:opacity-60'
                onClick={handleClose}
              >
                Cancel
              </ButtonBase>

              <ButtonBase
                disabled={loading}
                className='bg-primary flex items-center gap-2 text-white disabled:opacity-60'
                onClick={handleConfirm}
              >
                {loading ? <LoadingSpinner size={16} /> : 'Confirm'}
              </ButtonBase>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
export default ConfirmDialog;
