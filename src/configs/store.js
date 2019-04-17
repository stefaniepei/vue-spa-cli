import Vue from "vue";
import Vuex from "vuex";
import demoStore from "@/stores/demoStore";
import imageStore from "@/stores/imageStore";
import Env from "@/configs/env";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins:
    Env.DEFAULT.MODE === "window"
      ? [require("vuex-electron").createPersistedState()]
      : [],
  modules: {
    demoStore,
    imageStore
  },
  state: {},
  mutations: {},
  actions: {}
});
