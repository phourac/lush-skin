declare namespace ICoupon {
  interface ICouponResponse {
    status: number;
    message: string;
    data: ICouponResponseData;
  }

  interface ICouponResponseData {
    zone: Zone[];
    id: number;
    shopId: number;
    name: string;
    value: number;
    type: string;
    rule: string;
    target: string;
    code: string;
    minOrderAmount: number;
    maxDiscountValue: number;
    qty: number;
    limitPerUser: number;
    termAndCondition: string;
    status: string;
    startDate: string;
    endDate: string;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Zone {
    lat: number;
    lng: number;
  }
}
