import Vue from "vue";
import Router from "vue-router";
import Env from "@/configs/env";
Vue.use(Router);

/**
 * component: () => import("../mobile/About.vue")
 * webpackChunkName: "about"
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */

// 移动端H5的路由
const mobileRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("../mobile/Home/home.vue") // 首页
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("../mobile/Demo/demo.vue") // 装饰器demo页
  },
  {
    path: "/image",
    name: "image",
    component: () => import("../mobile/Image/image.vue") // 图片显示窗口
  }
];

// pc端路由开始
const pcRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pc/Home/home.vue") // 首页
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("../pc/Demo/demo.vue") // 装饰器demo页
  },
  {
    path: "/image",
    name: "image",
    component: () => import("../pc/Image/image.vue") // 图片显示窗口
  }
];
export default new Router({
  routes: Env.DEFAULT.MODE === "mobile" ? mobileRoutes : pcRoutes
});
