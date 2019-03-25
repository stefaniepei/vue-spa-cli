/* eslint-disable */
import axios from 'axios';
import _debug from 'debug';
import Env from './env'
import { SUCCESS_CODE, TIME_OUT } from '../constants/common'

const debug = _debug('app:Api');

export const BaseURL = Env.HTTP_API;

axios.defaults.timeout = TIME_OUT;

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;

// request拦截器
axios.interceptors.request.use(
  config => {
    config.baseURL = BaseURL;
    debug('[AxiosConfig]', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response拦截器
axios.interceptors.response.use(
  response => {
    debug('[AxiosResponse]', response);

    const statusCode =
      !!response && !!response.data && !!response.data.code ? response.data.code : SUCCESS_CODE;
    const msg = !!response && !!response.data && !!response.data.msg ? response.data.msg : '';

    if (statusCode < SUCCESS_CODE || statusCode > SUCCESS_CODE) {
      this.$message.error(msg);
      throw error;
    }
    // if (!!response.data && !!response.data.size && !!response.data.type) {
    //   const fileName = '导出报表.xls';
    //   const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
    //   if (window.navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveBlob(blob, fileName);
    //   } else {
    //     const link = document.getElementById('link');
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = fileName;
    //     link.click();
    //     window.URL.revokeObjectURL(link.href);
    //   }
    // }
    return response && response.data ? response.data : null;
  },
  error => {
    debug('[AxiosError]', error);
    debug('[AxiosErrorResponse]', error.response);
    return Promise.reject(error);
  }
);

export default axios;
