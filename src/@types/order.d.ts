declare namespace IOrder {
  interface IPrecheckout {
    status: number;
    message: string;
    data: IPrecheckoutData;
  }

  interface IPrecheckoutData {
    subTotal: number;
    deliveryFee: number;
    discountTotal: number;
    couponDiscountTotal: number;
    finalSubTotal: number;
    paymentMethods: PaymentMethod[];
    productVariants: ProductVariant[];
    coupon: ICoupon;
    cusAddress: any;
    preCheckoutProducts: PreCheckoutProduct[];
  }

  interface ICoupon {
    zone: {
      lat: number;
      lng: number;
    }[];

    id: number;
    shopId: number;
    name: string;
    value: number;
    type: 'PERCENTAGE' | 'FIXED' | string; // adjust if you have strict enums
    rule: 'ALL' | 'NEW_USER' | string; // adjust if needed
    target: 'PRODUCT' | 'ORDER' | string; // adjust if needed
    code: string;

    minOrderAmount: number;
    maxDiscountValue: number;
    qty: number;
    limitPerUser: number;

    termAndCondition: string;
    status: 'ACTIVE' | 'INACTIVE' | string;

    startDate: string; // can also be Date if you convert
    endDate: string;

    createdBy: number;
    createdAt: string;
    updatedAt: string;
  }

  interface PaymentMethod {
    imageUrl: string;
    thumbnailUrl: string;
    createdBy: any;
    updatedBy: any;
    id: number;
    name: string;
    status: string;
    integrationId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
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
    detailTextEn: any;
    detailHtmlEn: any;
    detailTextKh: any;
    detailHtmlKh: any;
    shopId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productImages: ProductImage[];
  }

  interface ProductImage {
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

  interface PreCheckoutProduct {
    productVariantId: number;
    productId: number;
    qty: number;
    productVariant: ProductVariant2;
  }

  interface ProductVariant2 {
    price: number;
    discount: number;
    afterDiscount: number;
    createdBy: number;
    updatedBy: any;
    id: number;
    sku: string;
    barcode: string;
    stock: number;
    attributes: Record<string, string>;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productId: number;
    discounts: any[];
    product: Product2;
  }

  interface Product2 {
    createdBy: number;
    updatedBy: any;
    id: number;
    nameKh: string;
    nameEn: string;
    description: string;
    unit: string;
    status: string;
    detailTextEn: any;
    detailHtmlEn: any;
    detailTextKh: any;
    detailHtmlKh: any;
    shopId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    productImages: ProductImage2[];
  }

  interface ProductImage2 {
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

  //place order
  interface IPlaceOrderRes {
    status: number;
    message: string;
    data: IPlaceOrderResData;
  }

  interface IPlaceOrderResData {
    order: Order;
    initPayment: InitPayment;
  }

  interface Order {
    cusCoords: CusCoords;
    shopCoords: ShopCoords;
    subTotal: number;
    discount: number;
    couponDiscount: number;
    deliveryFee: number;
    discountDeliveryFee: number;
    packagingFee: number;
    total: number;
    id: number;
    shopId: number;
    paymentMethodId: number;
    deliveryMethod: string;
    deliveryTiming: string;
    cusInfo: CusInfo;
    cusAddressInfo: CusAddressInfo;
    paymentInfo: PaymentInfo;
    paymentType: string;
    paymentStatus: string;
    couponCode: string;
    couponInfo: CouponInfo;
    trackingUrl: any;
    cancelReason: any;
    status: string;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    orderProducts: OrderProduct[];
    paymentTransactions: PaymentTransaction[];
    shop: Shop;
  }

  interface CusCoords {
    lat: number;
    lng: number;
  }

  interface ShopCoords {
    lat: number;
    lng: number;
  }

  interface CusInfo {
    cusName: string;
    cusPhone: string;
    cusRemark: string;
    cusPaymentReceptUrl: string;
  }

  interface CusAddressInfo {
    cusAddressNote: string;
    cusAddressType: string;
    cusAddressDetail: string;
  }

  interface PaymentInfo {
    paymentMethodName: string;
    paymentMethodImgUrl: string;
    paymentMethodThumbnailUrl: string;
  }

  interface OrderProduct {
    discount: number;
    subTotal: number;
    total: number;
    id: number;
    productInfo: ProductInfo;
    discountInfo: DiscountInfo;
    qty: number;
    orderId: number;
    productId: number;
    variantId: number;
  }

  interface ProductInfo {
    id: number;
    sku: string;
    price: number;
    stock: number;
    barcode: string;
    product: Product;
    discount: number;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    discounts: Discount[];
    productId: number;
    updatedAt: string;
    updatedBy: number;
    attributes: Attributes;
    afterDiscount: number;
  }

  interface Product {
    id: number;
    unit: string;
    nameEn: string;
    nameKh: string;
    shopId: number;
    status: string;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    updatedAt: string;
    updatedBy: number;
    description: string;
    detailHtmlEn: any;
    detailHtmlKh: any;
    detailTextEn: any;
    detailTextKh: any;
    productImages: ProductImage[];
  }

  interface ProductImage {
    id: number;
    imageUrl: string;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    productId: number;
    updatedAt: string;
    updatedBy: number;
    thumbnailUrl: string;
  }

  interface Discount {
    id: number;
    name: string;
    rule: string;
    type: string;
    limit: number;
    value: number;
    shopId: number;
    status: string;
    endDate: string;
    createdAt: string;
    createdBy: number;
    startDate: string;
    updatedAt: string;
    updatedBy: number;
  }

  interface Attributes {
    size: string;
    color: string;
  }

  interface DiscountInfo {
    id: number;
    name: string;
    rule: string;
    type: string;
    limit: number;
    value: number;
    shopId: number;
    status: string;
    endDate: string;
    createdAt: string;
    createdBy: number;
    startDate: string;
    updatedAt: string;
    updatedBy: number;
  }

  interface PaymentTransaction {
    createdBy: number;
    updatedBy: number;
    id: number;
    tranId: string;
    status: string;
    paymentInfo: PaymentInfo2;
    paymentMethodId: number;
    orderId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  interface PaymentInfo2 {
    id: number;
    name: string;
    status: string;
    imageUrl: string;
    createdAt: string;
    createdBy: any;
    deletedAt: any;
    updatedAt: string;
    updatedBy: any;
    thumbnailUrl: string;
    integrationId: number;
  }

  interface Shop {
    imgUrl: string;
    coords: Coords;
    id: number;
    name: string;
    status: string;
    openTime: string;
    closeTime: string;
    address: Address;
    contactName: string;
    contactPhone: string;
    deliveryFeeChargeType: string;
    deliveryType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    telegrams: Telegram[];
  }

  interface Coords {
    lat: number;
    lng: number;
  }

  interface Address {
    city: string;
    street: string;
    province: string;
    postalCode: string;
  }

  interface Telegram {
    id: number;
    botToken: string;
    chatName: string;
    chatId: string;
    shopId: number;
    createdAt: string;
    updatedAt: string;
  }

  interface InitPayment {
    url: string;
    deeplink: string;
    tranId: string;
    ref: string;
    data: Data2;
  }

  interface Data2 {
    qr: string;
    md5: string;
  }

  //order detail
  interface IOrderDetail {
    status: number;
    message: string;
    data: IOrderDetailData;
  }

  interface IOrderDetailData {
    cusCoords: CusCoords;
    shopCoords: ShopCoords;
    subTotal: number;
    discount: number;
    couponDiscount: number;
    deliveryFee: number;
    discountDeliveryFee: number;
    packagingFee: number;
    total: number;
    id: number;
    shopId: number;
    paymentMethodId: number;
    deliveryMethod: string;
    deliveryTiming: string;
    cusInfo: CusInfo;
    cusAddressInfo: CusAddressInfo;
    paymentInfo: PaymentInfo;
    paymentType: string;
    paymentStatus: string;
    couponCode: string;
    couponInfo: CouponInfo;
    trackingUrl: any;
    cancelReason: any;
    status: string;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    orderProducts: OrderProduct[];
    paymentTransactions: PaymentTransaction[];
    shop: Shop;
  }

  interface CusCoords {
    lat: number;
    lng: number;
  }

  interface ShopCoords {
    lat: number;
    lng: number;
  }

  interface CusInfo {
    cusName: string;
    cusPhone: string;
    cusRemark: string;
    cusPaymentReceptUrl: string;
  }

  interface CusAddressInfo {
    cusAddressNote: string;
    cusAddressType: string;
    cusAddressDetail: string;
  }

  interface PaymentInfo {
    paymentMethodName: string;
    paymentMethodImgUrl: string;
    paymentMethodThumbnailUrl: string;
  }

  interface OrderProduct {
    discount: number;
    subTotal: number;
    total: number;
    id: number;
    productInfo: ProductInfo;
    discountInfo: DiscountInfo;
    qty: number;
    orderId: number;
    productId: number;
    variantId: number;
  }

  interface ProductInfo {
    id: number;
    sku: string;
    price: number;
    stock: number;
    barcode: string;
    product: Product;
    discount: number;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    discounts: Discount[];
    productId: number;
    updatedAt: string;
    updatedBy: number;
    attributes: Attributes;
    afterDiscount: number;
  }

  interface Product {
    id: number;
    unit: string;
    nameEn: string;
    nameKh: string;
    shopId: number;
    status: string;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    updatedAt: string;
    updatedBy: number;
    description: string;
    detailHtmlEn: any;
    detailHtmlKh: any;
    detailTextEn: any;
    detailTextKh: any;
    productImages: ProductImage[];
  }

  interface ProductImage {
    id: number;
    imageUrl: string;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    productId: number;
    updatedAt: string;
    updatedBy: number;
    thumbnailUrl: string;
  }

  interface Discount {
    id: number;
    name: string;
    rule: string;
    type: string;
    limit: number;
    value: number;
    shopId: number;
    status: string;
    endDate: string;
    createdAt: string;
    createdBy: number;
    startDate: string;
    updatedAt: string;
    updatedBy: number;
  }

  interface Attributes {
    size: string;
    color: string;
  }

  interface DiscountInfo {
    id: number;
    name: string;
    rule: string;
    type: string;
    limit: number;
    value: number;
    shopId: number;
    status: string;
    endDate: string;
    createdAt: string;
    createdBy: number;
    startDate: string;
    updatedAt: string;
    updatedBy: number;
  }

  interface PaymentTransaction {
    createdBy: number;
    updatedBy: number;
    id: number;
    tranId: string;
    status: string;
    paymentInfo: PaymentInfo2;
    paymentMethodId: number;
    orderId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  interface PaymentInfo2 {
    id: number;
    name: string;
    status: string;
    imageUrl: string;
    createdAt: string;
    createdBy: any;
    deletedAt: any;
    updatedAt: string;
    updatedBy: any;
    thumbnailUrl: string;
    integrationId: number;
  }

  interface Shop {
    imgUrl: string;
    coords: Coords;
    id: number;
    name: string;
    status: string;
    openTime: string;
    closeTime: string;
    address: Address;
    contactName: string;
    contactPhone: string;
    deliveryFeeChargeType: string;
    deliveryType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  interface Coords {
    lat: number;
    lng: number;
  }

  interface Address {
    city: string;
    street: string;
    province: string;
    postalCode: string;
  }

  //order list
  interface IOrderList {
    status: number;
    message: string;
    data: IOrderListData[];
    pagination: Pagination;
  }

  interface IOrderListData {
    cusCoords: CusCoords;
    shopCoords: ShopCoords;
    subTotal: number;
    discount: number;
    couponDiscount: number;
    deliveryFee: number;
    discountDeliveryFee: number;
    packagingFee: number;
    total: number;
    id: number;
    shopId: number;
    paymentMethodId: number;
    deliveryMethod: string;
    deliveryTiming: string;
    cusInfo: CusInfo;
    cusAddressInfo: CusAddressInfo;
    paymentInfo: PaymentInfo;
    paymentType: string;
    paymentStatus: string;
    couponCode: string;
    couponInfo: CouponInfo;
    trackingUrl: any;
    cancelReason: any;
    status: string;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    orderProducts: OrderProduct[];
    paymentTransactions: PaymentTransaction[];
    shop: Shop;
  }

  interface CusCoords {
    lat: number;
    lng: number;
  }

  interface ShopCoords {
    lat: number;
    lng: number;
  }

  interface CusInfo {
    cusName: string;
    cusPhone: string;
    cusRemark: string;
    cusPaymentReceptUrl: string;
  }

  interface CusAddressInfo {
    cusAddressNote: string;
    cusAddressType: string;
    cusAddressDetail: string;
  }

  interface PaymentInfo {
    paymentMethodName: string;
    paymentMethodImgUrl: string;
    paymentMethodThumbnailUrl: string;
  }

  interface OrderProduct {
    discount: number;
    subTotal: number;
    total: number;
    id: number;
    productInfo: ProductInfo;
    discountInfo: DiscountInfo;
    qty: number;
    orderId: number;
    productId: number;
    variantId: number;
  }

  interface ProductInfo {
    id: number;
    sku: string;
    price: number;
    stock: number;
    barcode: string;
    product: Product;
    discount: number;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    discounts: Discount[];
    productId: number;
    updatedAt: string;
    updatedBy: number;
    attributes: Attributes;
    afterDiscount: number;
  }

  interface Product {
    id: number;
    unit: string;
    nameEn: string;
    nameKh: string;
    shopId: number;
    status: string;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    updatedAt: string;
    updatedBy: number;
    description: string;
    detailHtmlEn: any;
    detailHtmlKh: any;
    detailTextEn: any;
    detailTextKh: any;
    productImages: ProductImage[];
  }

  interface ProductImage {
    id: number;
    imageUrl: string;
    createdAt: string;
    createdBy: number;
    deletedAt: any;
    productId: number;
    updatedAt: string;
    updatedBy: number;
    thumbnailUrl: string;
  }

  interface Discount {
    id: number;
    name: string;
    rule: string;
    type: string;
    limit: number;
    value: number;
    shopId: number;
    status: string;
    endDate: string;
    createdAt: string;
    createdBy: number;
    startDate: string;
    updatedAt: string;
    updatedBy: number;
  }

  interface Attributes {
    size: string;
    color: string;
  }

  interface DiscountInfo {
    id: number;
    name: string;
    rule: string;
    type: string;
    limit: number;
    value: number;
    shopId: number;
    status: string;
    endDate: string;
    createdAt: string;
    createdBy: number;
    startDate: string;
    updatedAt: string;
    updatedBy: number;
  }

  interface PaymentTransaction {
    createdBy: number;
    updatedBy: number;
    id: number;
    tranId: string;
    status: string;
    paymentInfo: PaymentInfo2;
    paymentMethodId: number;
    orderId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  interface PaymentInfo2 {
    id: number;
    name: string;
    status: string;
    imageUrl: string;
    createdAt: string;
    createdBy: any;
    deletedAt: any;
    updatedAt: string;
    updatedBy: any;
    thumbnailUrl: string;
    integrationId: number;
  }

  interface Shop {
    imgUrl: string;
    coords: Coords;
    id: number;
    name: string;
    status: string;
    openTime: string;
    closeTime: string;
    address: Address;
    contactName: string;
    contactPhone: string;
    deliveryFeeChargeType: string;
    deliveryType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }

  interface Coords {
    lat: number;
    lng: number;
  }

  interface Address {
    city: string;
    street: string;
    province: string;
    postalCode: string;
  }

  interface Pagination {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  }
}
