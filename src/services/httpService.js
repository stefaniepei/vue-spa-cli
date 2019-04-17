import axios from "@/configs/axios";
import StorageService from "./storageService";

const HttpService = {
  get(url, params, configs = {}) {
    return axios.get(url, { params }, configs);
  },
  post(url, params, configs = {}) {
    configs.headers["X-Auth-Token"] =
      StorageService.getItem("X-Auth-Token") || null;
    return axios.post(url, params, configs);
  },
  postWithoutToken(url, params, configs = {}) {
    return axios.post(url, params, configs);
  }
};

export default HttpService;
