/* eslint-disable indent */
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/index.scss";
import Vue from "vue";
import ElementUI from "element-ui";
import App from "@/window/App.vue";
import PcApp from "@/pc/PcApp.vue";
import MobileApp from "@/mobile/MobileApp.vue";
import Env from "@/configs/env";
import ValidateUtils from "@/utils/validateUtils";
import router from "@/configs/router";
import store from "@/configs/store";
import * as filters from "@/configs/filters";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Object.keys(filters).forEach(key => Vue.filter(key, filters[key])); //install filters

new Vue({
  router,
  store,
  render: h =>
    h(
      Env.DEFAULT.MODE === "window"
        ? App
        : ValidateUtils.isMobile()
        ? MobileApp
        : PcApp
    )
}).$mount("#app");
