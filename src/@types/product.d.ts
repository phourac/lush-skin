declare namespace IProduct {
  interface IProductRes {
    id: number;
    nameKh: string;
    nameEn: string;
    description: string;
    unit: string;
    status: 'ACTIVE' | 'INACTIVE';
    shopId: number;
    isFav?: number;
    ProductImages: ProductImage[];
    ProductVariants: ProductVariant[];
  }
  interface ProductVariant {
    id: number;
    sku: string;
    barcode: string;
    price: number;
    stock: number;
    productId: number;
  }

  interface ProductImage {
    id: number;
    imageUrl: string;
    productId: number;
  }
}
