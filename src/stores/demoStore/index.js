import * as types from "./type";
import * as api from "./api";

export default {
  state: {
    test: "",
    test2: ""
  },
  mutations: {
    [types.SET_STATE](state, obj) {
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
    async [types.SEND_TEST]({ commit }, params) {
      let res = await api.sendTest(params);
      if (res && res.code === 200) {
        commit(types.SET_STATE, {
          key: "test",
          val: res.data
        });
      }
    },
    async [types.SEND_TEST2]({ commit }, params) {
      let res = await api.sendTest2(params);
      if (res && res.code === 200) {
        commit(types.SET_STATE, {
          key: "test2",
          val: res.data
        });
      }
    }
  }
};
