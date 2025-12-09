'use client';

import { SessionPayload } from '@/actions/auth';

import { AddressWrapper } from '@/contexts/AddressContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

import { FavoriteWrapper } from './FavoriteContext';
import { ProductWrapper } from './ProductContext';
import ToastProvider from './ToastProvider';

export default function ClientProviders({
  children,
  sessioon,
  handleDeleteSes,
}: {
  children: React.ReactNode;
  sessioon: SessionPayload | null;
  handleDeleteSes(): Promise<void>;
}) {
  return (
    <ToastProvider>
      <AuthProvider {...{ sessioon, handleDeleteSes }}>
        <AddressWrapper>
          <ProductWrapper>
            <FavoriteWrapper>
              <CartProvider>{children}</CartProvider>
            </FavoriteWrapper>
          </ProductWrapper>
        </AddressWrapper>
      </AuthProvider>
    </ToastProvider>
  );
}
