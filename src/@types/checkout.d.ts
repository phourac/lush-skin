declare namespace ICheckout {
  interface ICheckoutItem {
    productId: number;
    shopId: number;
    name: string;
    image: string;
    variantId: number;
    sku: string;
    price: number;
    quantity: number;
  }
}
