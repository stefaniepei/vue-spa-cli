import "./assets/css/reset.min.css";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import ElementUI from "element-ui";
import App from "./views/App.vue";
import router from "./configs/router";
import store from "./configs/store";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
