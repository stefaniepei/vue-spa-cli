import Vue from "vue";
import Vuex from "vuex";
import demoStore from "../stores/demoStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    demoStore
  },
  state: {},
  mutations: {},
  actions: {}
});
