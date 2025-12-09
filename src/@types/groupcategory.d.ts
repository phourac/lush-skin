declare namespace IGroupCategory {
  interface IGroupCategoryRes {
    status: number;
    message: string;
    data: IGroupCategoryData[];
    pagination: Pagination;
  }

  interface IGroupCategoryData {
    imageUrl: string;
    thumbUrl: string;
    createdBy: number;
    updatedBy: number;
    id: number;
    nameKm: string;
    nameEn: string;
    status: string;
    sortOrder: any;
    shopId: number;
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
