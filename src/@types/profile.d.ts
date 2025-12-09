declare namespace IProfile {
  interface IProfileRes {
    status: number;
    message: string;
    data: IProfileResData;
  }

  interface IProfileResData {
    id: number;
    uuid: string;
    username: string;
    userType: string;
    status: string;
    roles: any;
    permissions: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    userInfo: UserInfo;
  }

  interface UserInfo {
    imageUrl: string;
    id: number;
    userId: number;
    phone: any;
    email: any;
    firstname: string;
    lastname: string;
    dob: any;
    gender: any;
    createdAt: string;
    updatedAt: string;
  }
}
