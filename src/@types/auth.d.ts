declare namespace IAuth {
  interface ICheck {
    status: number;
    message: string;
    data: ICheckData[];
  }

  interface ICheckData {
    uuid: string;
    username: string;
    userInfo: UserInfo;
  }

  interface UserInfo {
    imageUrl: string;
    phone: any;
    email: any;
    firstname: string;
    lastname: string;
    dob: any;
    gender: any;
  }

  //sign in

  interface ISignIn {
    success: boolean;
    message: string;
    data: Tokens;
  }

  interface Tokens {
    user: User;
    tokens: Tokens2;
  }

  interface User {
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

  interface Tokens2 {
    accessToken: string;
    refreshToken: string;
  }

  //sing up

  interface ISignUp {
    status: number;
    message: string;
    data: Tokens;
  }
}
