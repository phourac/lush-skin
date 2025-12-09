declare namespace ICategory {
  interface ICategoryRes {
    status: number;
    message: string;
    data: ICategoryData[];
    pagination: Pagination;
  }

  interface ICategoryData {
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
    productCategoryGroupId?: number;
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
