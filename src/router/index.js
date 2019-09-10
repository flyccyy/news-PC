import Vue from "vue";
import VueRouter from "vue-router";

import login from "../views/login";
import home from "../views/home";
import article from "../views/home/article";
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  {
    path: "/home",
    component: home,
    children: [{ path: "/article", component: article }]
  }
];

const router = new VueRouter({
  routes
});
export default router;
