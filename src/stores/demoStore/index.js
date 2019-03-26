import * as ActionTypes from "./type";
import { Api } from "./api";
import { SUCCESS_CODE, SET_STATE } from "../../configs/constants";

export default {
  state: {
    test: "",
    test2: ""
  },
  mutations: {
    setState(state, obj) {
      state[obj.key] = obj.val;
    },
    toggle(state, key) {
      state[key] = !state[key];
    },
    setObjectState(state, obj) {
      if (!state[obj.key]) return;
      state[obj.key] = Object.assign(state[obj.key], obj.val);
    }
  },
  actions: {
    [SET_STATE]({ commit }, params) {
      commit("setState", {
        key: params.key,
        val: params.val
      });
    },
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
