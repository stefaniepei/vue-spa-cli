import * as ActionTypes from "./type";
import { CommonMutations, CommonActions } from "../common";
import { Api } from "./api";
import { SUCCESS_CODE } from "@/configs/constants";

export default {
  state: {
    // 由于使用多窗口共享，请保证state唯一
    test: "",
    test2: ""
  },
  mutations: {
    ...CommonMutations
  },
  actions: {
    ...CommonActions,
    async [ActionTypes.SEND_TEST]({ commit }, params) {
      let res = await Api.sendTest(params);
      if (res && res.code === SUCCESS_CODE) {
        commit("setState", {
          key: "test",
          val: res.data
        });
      }
    },
    async [ActionTypes.SEND_TEST2]({ commit }, params) {
      let res = await Api.sendTest2(params);
      if (res && res.code === SUCCESS_CODE) {
        commit("setState", {
          key: "test2",
          val: res.data
        });
      }
    }
  }
};
