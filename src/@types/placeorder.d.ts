declare namespace IPlaceOrder {
  interface IItemToPlaceOrder {
    products: Product[];
    paymentMethodId?: number;
    cusRemark?: string;
    cusPaymentReceptUrl?: string;
    couponCode?: string;
    cusAddressId: number;
    cusCoordinate?: {
      lat: number;
      lng: number;
    };
  }

  interface Product {
    productId: number;
    productVariantId: number;
    qty: number;
  }
}
