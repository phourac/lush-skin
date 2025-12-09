interface SubRoute {
  subName: string;
}

interface NavigationItem {
  name: string;
  route: string;
  subRoutes: SubRoute[];
}

export const API_ROUTE = {
  root: '/',

  //auth
  signin: '/api/v1/auth/multi-identifier/sign-in',
  signup: '/api/v1/auth/sign-up',
  check: '/api/v1/auth/multi-identifier/get-profiles',

  //guest
  guestProduct: '/api/v1/guest/products',
  guestProductDetail: '/api/v1/guest/products/:id',
  guestCate: '/api/v1/guest/products/categories',
  guestGroupCate: '/api/v1/guest/products/categories/groups',

  //customer
  customerProduct: '/api/v1/customer/products',
  customerProductDetail: '/api/v1/customer/products/:id',
  customerCate: '/api/v1/customer/products/categories',
  customerGroupCate: '/api/v1/customer/products/categories/groups',

  //cart
  cart: '/api/v1/carts',
  removeCart: '/api/v1/carts',
  cartId: '/api/v1/carts/:id',
  reoder: '/api/v1/carts/reorder/:id',

  //address
  address: '/api/v1/customer/addresses',
  addressId: '/api/v1/customer/addresses/:id',
  removeAddress: '/api/v1/customer/addresses/:id',
  getplace: '/api/v1/customer/maps/places/from-coords',
  placeAutoComplete: '/api/v1/customer/maps/places/auto-complete',
  placeId: '/api/v1/customer/maps/places/by-place-id',

  //profile
  profile: '/api/v1/auth/profile',
  changePassword: '/api/v1/auth/change-password',

  //order
  preCheckoutByCart: '/api/v1/customer/orders/pre-checkout/cart',
  preCheckoutProductId: '/api/v1/customer/orders/pre-checkout',
  placeOrder: '/api/v1/customer/orders',
  orderDetail: '/api/v1/customer/orders/:id',

  //coupon
  coupon: '/api/v1/customer/coupons',

  //banner
  banner: '/api/v1/guest/banners',

  //favorite
  favorite: '/api/v1/customers/product-favorites',
  favoriteRemove: '/api/v1/customers/product-favorites/:productId',
};
export const navigation: NavigationItem[] = [
  {
    name: 'new',
    route: '/shop?sort=new',
    subRoutes: [],
  },
  {
    name: 'shop',
    route: '/shop',
    subRoutes: [
      {
        subName: 'shop',
      },
    ],
  },
  {
    name: 'about',
    route: '/about',
    subRoutes: [],
  },
  {
    name: 'affiliate',
    route: '/affiliate',
    subRoutes: [
      {
        subName: 'affiliate',
      },
    ],
  },
];

export const sideBarMenu = [
  {
    id: 1,
    name: 'Account Details',
    icon: '/account.svg',
    iconActive: '/account-active.svg',
  },
  {
    id: 2,
    name: 'Addresses',
    icon: '/address.svg',
    iconActive: '/address-active.svg',
  },
  {
    id: 3,
    name: 'Purchase Order',
    icon: '/purches.svg',
    iconActive: '/purches-active.svg',
    href: '/order',
  },
  {
    id: 4,
    name: 'Logout',
    icon: '/logout.svg',
    iconActive: '/logout-active.svg',
  },
];
