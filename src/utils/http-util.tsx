import axios, { AxiosError, AxiosResponse } from 'axios';

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || 'lush_skin';

axios.defaults.headers.common['x-tenant-id'] = TENANT_ID;

// ✅ Response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;

    // ✅ Handle "fake" errors inside a 200 response
    if (
      data &&
      (data.error === true ||
        data.success === false || // ✅ Check for success: false
        (data.status && data.status >= 400)) // ✅ Only reject if status is 400+
    ) {
      return Promise.reject({
        status: data.status || response.status,
        message: data.message || 'An unknown error occurred',
        data: data.data ?? null,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      const message =
        (data as any)?.message ||
        (typeof data === 'string' ? data : JSON.stringify(data)) ||
        'An unknown error occurred';

      return Promise.reject({
        status,
        message,
        data,
      });
    }

    if (error.request) {
      return Promise.reject({
        status: 0,
        message: 'No response from server. Please check your connection.',
      });
    }

    return Promise.reject({
      status: 0,
      message: error.message || 'Unexpected error occurred.',
    });
  }
);

const http = axios;
export default http;
