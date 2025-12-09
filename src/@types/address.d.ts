declare namespace IAddress {
  interface IAddressRes {
    status: number;
    message: string;
    data: IAddressResData[];
    pagination: Pagination;
  }

  interface IAddressResData {
    coords: ICoord;
    id: number;
    ownerName: string;
    ownerPhone: string;
    addrNote: string;
    addrType: string;
    detail: string;
    isPinned: boolean;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
  }

  interface ICoord {
    lat: number;
    lng: number;
  }

  interface Pagination {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  }

  //addres detail
  interface IAddressDetail {
    status: number;
    message: string;
    data: IAddressDetailData;
  }

  interface IAddressDetailData {
    coords: Coords;
    id: number;
    ownerName: string;
    ownerPhone: string;
    addrNote: string;
    addrType: string;
    detail: string;
    isPinned: boolean;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Coords {
    lat: number;
    lng: number;
  }

  //get place
  interface IGetPlaceRes {
    status: number;
    message: string;
    data: IGetPlaceResData;
  }

  interface IGetPlaceResData {
    plus_code: Pluscode;
    results: Result[];
    status: string;
  }

  interface Pluscode {
    compound_code: string;
    global_code;
  }

  interface Result {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    navigation_points?: NavigationPoint[];
    place_id: string;
    types: string[];
    plus_code?: PlusCode2;
  }

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  interface Geometry {
    bounds?: Bounds;
    location: Location;
    location_type: string;
    viewport: Viewport;
  }

  interface Bounds {
    northeast: Northeast;
    southwest: Southwest;
  }

  interface Northeast {
    lat: number;
    lng: number;
  }

  interface Southwest {
    lat: number;
    lng: number;
  }

  interface Location {
    lat: number;
    lng: number;
  }

  interface Viewport {
    northeast: Northeast2;
    southwest: Southwest2;
  }

  interface Northeast2 {
    lat: number;
    lng: number;
  }

  interface Southwest2 {
    lat: number;
    lng: number;
  }

  interface NavigationPoint {
    location: Location2;
  }

  interface Location2 {
    latitude: number;
    longitude: number;
  }

  interface PlusCode2 {
    compound_code: string;
    global_code: string;
  }

  //place autocomplete
  interface IPlaceAutoCompleteRes {
    status: number;
    message: string;
    data: IPlaceAutoCompleteData[];
  }

  interface IPlaceAutoCompleteData {
    suggestions: Suggestion[];
  }

  interface Suggestion {
    placePrediction: PlacePrediction;
    kind: string;
  }

  interface PlacePrediction {
    types: any[];
    place: string;
    placeId: string;
    text: Text;
    structuredFormat: any;
    distanceMeters: number;
  }

  interface Text {
    matches: Match[];
    text: string;
  }

  interface Match {
    startOffset: number;
    endOffset: number;
  }

  //placeId
  interface IPlaceIdRes {
    status: number;
    message: string;
    data: IPlaceIdData[];
  }

  interface IPlaceIdData {
    types: any[];
    addressComponents: any[];
    attributions: any[];
    currentSecondaryOpeningHours: any[];
    regularSecondaryOpeningHours: any[];
    reviews: any[];
    photos: any[];
    subDestinations: any[];
    containingPlaces: any[];
    name: string;
    id: string;
    nationalPhoneNumber: string;
    internationalPhoneNumber: string;
    formattedAddress: string;
    plusCode: any;
    location: Location;
    viewport: any;
    rating: number;
    googleMapsUri: string;
    websiteUri: string;
    regularOpeningHours: any;
    adrFormatAddress: string;
    businessStatus: string;
    priceLevel: string;
    iconMaskBaseUri: string;
    iconBackgroundColor: string;
    displayName: DisplayName;
    primaryTypeDisplayName: any;
    currentOpeningHours: any;
    primaryType: string;
    shortFormattedAddress: string;
    editorialSummary: any;
    paymentOptions: any;
    parkingOptions: any;
    fuelOptions: any;
    evChargeOptions: any;
    generativeSummary: any;
    addressDescriptor: any;
    priceRange: any;
    reviewSummary: any;
    timeZone: any;
    evChargeAmenitySummary: any;
    postalAddress: any;
    neighborhoodSummary: any;
    consumerAlert: any;
    movedPlace: string;
    movedPlaceId: string;
  }

  interface Location {
    latitude: number;
    longitude: number;
  }

  interface DisplayName {
    text: string;
    languageCode: string;
  }
}
