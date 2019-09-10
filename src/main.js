import Vue from "vue";
import ElementUI from "element-ui";
import axios from "axios";

import App from "./App.vue";

import router from "./router";

import "./assets/css/base.css";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://ttapi.research.itcast.cn";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
