import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.min.css";
import Vue from "vue";
import ElementUI from "element-ui";
import router from "@/configs/router";
import store from "@/configs/store";
import * as filters from "@/configs/filters";
import ValidateUtils from "@/utils/validateUtils";
import PcApp from "@/pc/PcApp.vue";
import MobileApp from "@/mobile/MobileApp.vue";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Object.keys(filters).forEach(key => Vue.filter(key, filters[key])); //install filters

new Vue({
  router,
  store,
  render: h => h(ValidateUtils.isMobile() ? MobileApp : PcApp)
}).$mount("#app");
