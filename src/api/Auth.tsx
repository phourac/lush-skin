import http from '@/utils/http-util';

const AUTH_API = {
  signIn: async (data: {
    username: string;
    password: string;
    uuid: string;
  }) => {
    const apiUrl = `/api/auth/signin`;
    const res = await http.post<IAuth.ISignIn>(`${apiUrl}`, data);
    return res.data;
  },
  signUp: async (data: {
    password: string;
    firstname: string;
    username: string;
    lastname: string;
  }) => {
    const apiUrl = `/api/auth/signup`;
    const res = await http.post<IAuth.ISignUp>(`${apiUrl}`, data);
    return res.data;
  },

  check: async (params: { username: string }) => {
    const apiUrl = `/api/auth/check`;
    const res = await http.get<IAuth.ICheck>(apiUrl, { params });
    return res.data;
  },
};

export default AUTH_API;
