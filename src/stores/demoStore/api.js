import HttpService from "../../services/httpService";
import AutoCatch from "../../decorators/auto_catch";

export const Api = {
  //获取验证码
  @AutoCatch()
  sendTest() {
    return HttpService.get("/sendTest", { time: new Date().getTime() });
  },
  // 用户登录
  @AutoCatch()
  sendTest2(params) {
    return HttpService.post("/sendTest2", params);
  }
};
