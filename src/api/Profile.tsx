import http from '@/utils/http-util';

const PROFILE_API = {
  profileDetail: async () => {
    const apiUrl = `/api/profile/detail`;
    const res = await http.get<IProfile.IProfileRes>(apiUrl);
    return res.data;
  },

  updateProfile: async (data: {
    imageFile?: File;
    username?: string;
    phone?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    dob?: string;
    gender?: string;
  }) => {
    const apiUrl = `/api/profile/update`;
    const formData = new FormData();
    if (data.imageFile) formData.append('imageFile', data.imageFile);
    if (data.username) formData.append('username', data.username);
    if (data.phone) formData.append('phone', data.phone);
    if (data.email) formData.append('email', data.email);
    if (data.firstname) formData.append('firstname', data.firstname);
    if (data.lastname) formData.append('lastname', data.lastname);
    if (data.dob) formData.append('dob', data.dob);
    if (data.gender) formData.append('gender', data.gender);
    const res = await http.patch<ICart.ICartAddSucces>(apiUrl, formData, {
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
      },
    });
    return res.data;
  },

  changePass: async (data: { oldPassword: string; newPassword: string }) => {
    const apiUrl = `/api/profile/change-password`;
    const res = await http.put(`${apiUrl}`, data);
    return res.data;
  },
};

export default PROFILE_API;
