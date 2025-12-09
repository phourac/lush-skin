export const listProduct: IProduct.IProductRes[] = [
  {
    id: 1,
    nameKh: 'សេនតេលា ប្រៃតិនីង អាំភូល ៥០មល',
    nameEn: 'Madagascar Centella Tone Brightening Capsule Ampoule 50ml',
    description: 'Brightening serum infused with centella for radiant skin.',
    unit: 'bottle',
    status: 'ACTIVE',
    shopId: 1,
    isFav: 1,
    ProductImages: [
      { id: 1, imageUrl: '/images/mocks/centella-tone.png', productId: 1 },
    ],
    ProductVariants: [
      {
        id: 101,
        sku: 'CENTELLA-TONE-50ML',
        barcode: '1111111111111',
        price: 100,
        stock: 10,
        productId: 1,
      },
    ],
  },
  {
    id: 2,
    nameKh: 'សេនតេលា ផូរ៉ូមៃស៊ីង អាំភូល ៥០មល',
    nameEn: 'Madagascar Centella Poremizing Fresh Ampoule 50ml',
    description: 'Tightens pores and refreshes skin with natural centella.',
    unit: 'bottle',
    status: 'ACTIVE',
    shopId: 1,
    isFav: 1,

    ProductImages: [
      {
        id: 2,
        imageUrl: '/images/mocks/centella-poremizing.png',
        productId: 2,
      },
      { id: 3, imageUrl: '/images/mocks/centella-tone.png', productId: 2 },
    ],
    ProductVariants: [
      {
        id: 102,
        sku: 'CENTELLA-PORE-50ML',
        barcode: '2222222222222',
        price: 150,
        stock: 15,
        productId: 2,
      },
    ],
  },
  {
    id: 3,
    nameKh: 'សេនតេលា ហាយលូ-សីកា ក្លីនស៊ីង មីល ២០០មល',
    nameEn: 'Madagascar Centella Hyalu-Cica Gentle Cleansing Milk 200ml',
    description: 'Gentle cleansing milk with hyaluronic acid and centella.',
    unit: 'bottle',
    status: 'ACTIVE',
    shopId: 1,
    isFav: 1,

    ProductImages: [
      {
        id: 4,
        imageUrl: '/images/mocks/centella-hyalu-cica.png',
        productId: 3,
      },
    ],
    ProductVariants: [
      {
        id: 103,
        sku: 'CENTELLA-CLEANSING-200ML',
        barcode: '3333333333333',
        price: 200,
        stock: 20,
        productId: 3,
      },
    ],
  },
  {
    id: 4,
    nameKh: 'សេនតេលា ផូរ៉ូមៃស៊ីង អាំភូល ៥០មល',
    nameEn: 'Madagascar Centella Poremizing Fresh Ampoule 50ml',
    description: 'Tightens pores and refreshes skin with natural centella.',
    unit: 'bottle',
    status: 'ACTIVE',
    shopId: 1,
    isFav: 1,

    ProductImages: [
      {
        id: 2,
        imageUrl: '/images/mocks/centella-poremizing.png',
        productId: 2,
      },
      { id: 3, imageUrl: '/images/mocks/centella-tone.png', productId: 2 },
    ],
    ProductVariants: [
      {
        id: 102,
        sku: 'CENTELLA-PORE-50ML',
        barcode: '2222222222222',
        price: 150,
        stock: 15,
        productId: 2,
      },
    ],
  },
  {
    id: 5,
    nameKh: 'សេនតេលា ប្រៃតិនីង អាំភូល ៥០មល',
    nameEn: 'Madagascar Centella Tone Brightening Capsule Ampoule 50ml',
    description: 'Brightening serum infused with centella for radiant skin.',
    unit: 'bottle',
    status: 'ACTIVE',
    shopId: 1,
    isFav: 1,

    ProductImages: [
      { id: 1, imageUrl: '/images/mocks/centella-tone.png', productId: 1 },
    ],
    ProductVariants: [
      {
        id: 101,
        sku: 'CENTELLA-TONE-50ML',
        barcode: '1111111111111',
        price: 100,
        stock: 10,
        productId: 1,
      },
    ],
  },
  {
    id: 6,
    nameKh: 'សេនតេលា ហាយលូ-សីកា ក្លីនស៊ីង មីល ២០០មល',
    nameEn: 'Madagascar Centella Hyalu-Cica Gentle Cleansing Milk 200ml',
    description: 'Gentle cleansing milk with hyaluronic acid and centella.',
    unit: 'bottle',
    status: 'ACTIVE',
    shopId: 1,
    isFav: 1,

    ProductImages: [
      {
        id: 4,
        imageUrl: '/images/mocks/centella-hyalu-cica.png',
        productId: 3,
      },
    ],
    ProductVariants: [
      {
        id: 103,
        sku: 'CENTELLA-CLEANSING-200ML',
        barcode: '3333333333333',
        price: 200,
        stock: 20,
        productId: 3,
      },
    ],
  },
];

export const cateSkincare = [
  { name: 'Moisturizers' },
  { name: 'Cleansers' },
  { name: 'Suncare' },
  { name: 'Masks' },
];

export const cateMakeup = [
  { name: 'Face Makeup' },
  { name: 'Eye Makeup' },
  { name: 'Lip Makeup' },
  { name: 'Nails' },
];

export const cateBrand = [
  { name: 'Madagascar Centella ' },
  { name: 'COSRX ' },
  { name: 'Medipill' },
  { name: 'Biohealbo' },
  { name: 'Anua' },
  { name: 'Gelcure' },
  { name: 'Skin1005' },
];

export const cash = [
  {
    id: 0,
    name: 'Cash on Delivery',
    description: '',
    thumbnailUrl: '/assets/riel.svg',
  },
];

export const addressLists = [
  {
    id: 1,
    type: 'Home',
    name: 'Raccc',
    phone: '012311242',
    address: '157 Oknha Tep Phan St.(182), Phnom Penh, Cambodia',
    active: true,
    note: '',
    location: {
      lat: 11.5755,
      lng: 104.9023,
    },
  },
  {
    id: 2,
    type: 'Company',
    name: 'Raccc',
    phone: '012311242',
    address: 'Phnom Penh City Center, Cambodia',
    active: false,
    note: '',
    location: {
      lat: 11.5639,
      lng: 104.9194,
    },
  },
  {
    id: 3,
    type: 'Other',
    name: 'Mom & Dad',
    phone: '098765432',
    address: 'No. 10A, Toul Kork, Phnom Penh',
    active: false,
    note: '',
    location: {
      lat: 11.5762,
      lng: 104.9017,
    },
  },
  {
    id: 4,
    type: 'Home',
    name: 'Raccc',
    phone: '012311242',
    address: '157 Oknha Tep Phan St.(182), Phnom Penh, Cambodia',
    active: true,
    note: '',
    location: {
      lat: 11.5755,
      lng: 104.9023,
    },
  },
  {
    id: 5,
    type: 'Company',
    name: 'Raccc',
    phone: '012311242',
    address: 'Phnom Penh City Center, Cambodia',
    active: false,
    note: '',
    location: {
      lat: 11.5639,
      lng: 104.9194,
    },
  },
  {
    id: 6,
    type: 'Other',
    name: 'Mom & Dad',
    phone: '098765432',
    address: 'No. 10A, Toul Kork, Phnom Penh',
    active: false,
    note: '',
    location: {
      lat: 11.5762,
      lng: 104.9017,
    },
  },
];

export const earning = [
  {
    title: 'Create Contents',
    des: 'Create a video featuring your purchase from LUSH SKIN',
    src: '/assets/register.svg',
  },
  {
    title: 'Share Your Posts',
    des: 'Post to your social using #lushskinviralpay and tag @lushskincc',
    src: '/assets/share-link.svg',
  },
  {
    title: 'Earn Commissions',
    des: 'Earn reward of up to $100 if your video reaches 10K views',
    src: '/assets/commision.svg',
  },
];
