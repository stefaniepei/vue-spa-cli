import { SET_STATE } from "@/configs/constants";
export const CommonMutations = {
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
};

export const CommonActions = {
  [SET_STATE]({ commit }, params) {
    commit("setState", {
      key: params.key,
      val: params.val
    });
  }
};
