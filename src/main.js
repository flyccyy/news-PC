import Vue from "vue";
import ElementUI from "element-ui";
import axios from "axios";
import JSONbig from "json-bigint";

import App from "./App.vue";

import router from "./router";
import store from './store'

import "./assets/css/base.css";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://ttapi.research.itcast.cn";
axios.defaults.transformResponse = [
  function(data) {
    try {
      console.log(data);
      console.log(JSONbig.parse(data));
      return JSONbig.parse(data);
    } catch (error) {
      return data;
    }
  }
];
//请求拦截：添加token,config包含了发送的请求的内容
axios.interceptors.request.use(
  function(config) {
    let user = JSON.parse(window.sessionStorage.getItem("user_info"));
    if (user) config.headers.Authorization = `Bearer ${user.token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
//响应拦截：判断有没有登录
axios.interceptors.response.use(function(response){
  return response;
},function(error){
  //401代表没有登录
  //error.response是一个对象
  if(error.response.status == 401){
    Vue.prototype.$message.error('请先登录');
    router.push('/login')
  }
  return Promise.reject(error);
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
