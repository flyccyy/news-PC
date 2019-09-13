import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

import "nprogress/nprogress.js";
import "nprogress/nprogress.css";

import login from "../views/login";
import home from "../views/home";
import article from "../views/home/article";
import publish from "../views/home/publish";
import media from "../views/home/media";
import account from "../views/home/account";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  {
    path: "/home",
    component: home,
    children: [
      { path: "/article", component: article },
      { path: "/publish", component: publish },
      { path: "/media", component: media },
      { path: "/account", component: account },
    ]
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
