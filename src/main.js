import Vue from "vue";
import App from "./views/App.vue";
import router from "./configs/router";
import store from "./configs/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
