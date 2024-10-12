import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// interface ApiResponse<T = any> {
//   code: number;
//   message: string;
//   data: T;
// }

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = 'your_token';

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // const res: ApiResponse = response.data;
    if (response.status !== 200) {
      // return Promise.reject(new Error(response.message || 'Error'));
      return Promise.reject(new Error('Error'));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized, please login.');
      }
    }
    return Promise.reject(error);
  }
);

interface IOptions {
  url: string;
  method?: 'get' | 'post' | 'put';
  data?: any;
}

export default (options: IOptions) => {
  options.method = options.method || 'get';

  return instance(options).then((res: AxiosResponse) => {
    if (res && res.data) {
      return res.data;
    }
  }).catch((err: any) => {
    console.error(err);
  });
};
