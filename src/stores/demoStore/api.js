import axios from "../../configs/axios";

//获取验证码
export function sendTest() {
  return axios.get(`/user/code/sendCode`, {
    params: {
      fresh: new Date().getTime()
    }
  });
}
// 用户登录
export function sendTest2(params) {
  return axios.post(`/user/login`, params);
}
