import Vue from "vue";
import Vuex from "vuex";
import demoStore from "@/stores/demoStore";
import imageStore from "@/stores/imageStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    demoStore,
    imageStore
  },
  state: {},
  mutations: {},
  actions: {}
});
