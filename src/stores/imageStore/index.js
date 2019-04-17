import * as ActionTypes from "./type";
import { CommonMutations, CommonActions } from "../common";

export default {
  state: {
    // 由于使用多窗口共享，请保证state唯一
    imgSrc: ""
  },
  mutations: {
    ...CommonMutations
  },
  actions: {
    ...CommonActions,
    [ActionTypes.SET_IMG_SRC]({ commit }, src) {
      commit("setState", {
        key: "imgSrc",
        val: src
      });
    }
  }
};
