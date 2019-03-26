/* eslint-disable */
import axios from 'axios';
import _debug from 'debug';
import Env from './env'
import { SUCCESS_CODE, TIME_OUT } from './constants'

const debug = _debug('app:Api');
const BaseURL = Env.DEFAULT.HTTP_API;

axios.defaults.timeout = TIME_OUT;

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = config => {
    for(let p in pending){
      debug({pending})
        if(pending[p].compare === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
            pending[p].cancelRequest(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}

// request拦截器
axios.interceptors.request.use(
  config => {
    config.baseURL = BaseURL;

    // ------------------------------------------------------------------------------------
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken( cancelRequest => {
       // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
       pending.push({ compare: config.url + '&' + config.method, cancelRequest });  
    });
    // -----------------------------------------------------------------------------------------
    
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
    // ------------------------------------------------------------------------------------------
    removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    // -------------------------------------------------------------------------------------------
    
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
