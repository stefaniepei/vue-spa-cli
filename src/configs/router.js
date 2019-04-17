/* eslint-disable indent */
import Vue from "vue";
import Router from "vue-router";
import Env from "@/configs/env";
import ValidateUtils from "@/utils/validateUtils";
Vue.use(Router);

/**
 * component: () => import("../window/About.vue")
 * webpackChunkName: "about"
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */

// 桌面端的路由
const windowRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("../window/Home/home.vue") // 首页
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("../window/Demo/demo.vue") // 装饰器demo页
  },
  {
    path: "/imageWindow",
    name: "image",
    component: () => import("../window/Image/image.vue") // 图片显示窗口
  },
  {
    path: "/networkWindow",
    name: "network",
    component: () => import("../window/Network/network.vue") // 网络检查窗口-隐藏窗口
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

export default new Router({
  routes:
    Env.DEFAULT.MODE === "window"
      ? windowRoutes
      : ValidateUtils.isMobile()
      ? mobileRoutes
      : pcRoutes
});
