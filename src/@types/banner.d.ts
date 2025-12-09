declare namespace IBanner {
  interface IBannerRes {
    status: number;
    message: string;
    data: IBannerResData[];
    pagination: Pagination;
  }

  interface IBannerResData {
    imageUrl: string;
    thumbnailUrl: string;
    id: number;
    type: string;
    displayType: string;
    link: string;
    name: string;
    status: string;
    startDate?: string;
    endDate?: string;
    shopId: number;
    createdBy: number;
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
}
