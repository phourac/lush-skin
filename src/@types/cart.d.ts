declare namespace ICart {
  interface ICartItem {
    productId: number;
    shopId: number;
    name: string;
    image: string;
    variantId: number;
    sku: string;
    price: number;
    quantity: number;
    isFav: number;
  }

  interface ICartRes {
    status: number;
    message: string;
    data: ICartResData[];
    pagination: Pagination;
  }

  interface ICartResData {
    id: number;
    userId: number;
    productId: number;
    variantId: number;
    qty: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
  }

  interface Product {
    createdBy: number;
    updatedBy: any;
    id: number;
    nameKh: string;
    nameEn: string;
    description: string;
    unit: string;
    status: string;
    shopId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productImages: ProductImage[];
    productVariants: ProductVariant[];
    productFavorites: [
      {
        userId: number;
        productId: number;
      },
    ];
  }

  interface ProductImage {
    id: number;
    imageUrl: string;
    productId: number;
  }

  interface ProductVariant {
    price: number;
    discount: number;
    afterDiscount: number;
    createdBy: number;
    updatedBy: any;
    id: number;
    sku: string;
    barcode: string;
    stock: number;
    attributes: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productId: number;
    discounts: any[];
  }

  interface Pagination {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  }

  //add success
  interface ICartAddSucces {
    status: number;
    message: string;
    data: ICartAddSuccesData;
  }

  interface ICartAddSuccesData {
    id: number;
    productId: number;
    variantId: number;
    qty: number;
    userId: number;
    updatedAt: string;
    createdAt: string;
  }

  //reoder sucess
  interface IReoder {
    status: number;
    message: string;
    data: IReoderData[];
  }

  interface IReoderData {
    id: number;
    userId: number;
    productId: number;
    variantId: number;
    qty: number;
    createdAt: string;
    updatedAt: string;
  }
}
