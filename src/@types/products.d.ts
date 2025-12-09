declare namespace IProducts {
  interface IProductRes {
    status: number;
    message: string;
    data: IProductData[];
    pagination: Pagination;
  }

  interface IProductData {
    createdBy: number;
    updatedBy?: number;
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
    productCategories: ProductCategory[];
    productFavorites: [
      {
        userId: number;
        productId: number;
      },
    ];
  }

  interface ProductImage {
    imageUrl: string;
    thumbnailUrl: string;
    createdBy: number;
    updatedBy?: number;
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productId: number;
  }

  interface ProductVariant {
    price: number;
    discount: number;
    afterDiscount: number;
    createdBy: number;
    updatedBy?: number;
    id: number;
    sku: string;
    barcode: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productId: number;
    discounts: any[];
  }

  interface ProductCategory {
    imageUrl: string;
    thumbUrl: string;
    createdBy: number;
    updatedBy: number;
    id: number;
    nameKh: string;
    nameEn: string;
    status: string;
    sortOrder: number;
    shopId: number;
    productCategoryGroupId: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  interface Pagination {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  }

  //get product detail
  interface IProductDetail {
    status: number;
    message: string;
    data: IProductDetailData;
  }

  interface IProductDetailData {
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
    productImages: ProductImageDetail[];
    productVariants: ProductVariantDetail[];
    productCategories: ProductCategoryDetail[];
    detailHtmlEn: {
      description: string;
      howToUse: string;
      ingredients: string;
    };
    detailHtmlKh: {
      description: string;
      howToUse: string;
      ingredients: string;
    };
    productFavorites: [
      {
        userId: number;
        productId: number;
      },
    ];
    discounts: IDiscount[];
  }

  interface IProductDiscountAssignment {
    id: number;
    discountId: number;
    productId: number;
    productVariantId: number | null;
  }

  type DiscountType = 'PERCENT' | 'FIXED' | string;
  type DiscountRule = 'OVERRIDE_PRICE' | 'REDUCE_PRICE' | string;
  type DiscountStatus = 'ACTIVE' | 'INACTIVE' | string;

  interface IDiscount {
    value: number;
    createdBy: number;
    updatedBy: number;
    id: number;
    name: string;
    type: DiscountType;
    rule: DiscountRule;
    limit: number;
    status: DiscountStatus;
    startDate: string; // ISO datetime
    endDate: string; // ISO datetime
    createdAt: string;
    updatedAt: string;
    shopId: number;
    productDiscountAssignment: IProductDiscountAssignment;
  }

  interface ProductImageDetail {
    imageUrl: string;
    thumbnailUrl: string;
    createdBy: number;
    updatedBy: any;
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productId: number;
  }

  interface ProductVariantDetail {
    price: number;
    discount: number;
    afterDiscount: number;
    createdBy: number;
    updatedBy: any;
    id: number;
    sku: string;
    barcode: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productId: number;
    discounts: IDiscount[];
    attributes: Record<string, string>;
  }

  interface ProductCategoryDetail {
    imageUrl: string;
    thumbUrl: string;
    createdBy: number;
    updatedBy: number;
    id: number;
    nameKh: string;
    nameEn: string;
    status: string;
    sortOrder: number;
    shopId: number;
    productCategoryGroupId: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  //favorite
  interface IFavoriteDetail {
    status: number;
    message: string;
    data: IFavoriteDetailData;
  }

  interface IFavoriteDetailData {
    productFavorites: ProductFavorite[];
  }

  interface ProductFavorite {
    userId: number;
    productId: number;
  }

  interface IIsFavoriteDetail {
    status: number;
    message: string;
    data: IIsFavoriteDetailData;
  }

  interface IIsFavoriteDetailData {
    isFav: boolean;
  }
}
