// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import  './element'
import axios from 'axios'
import utils from './utils/util'

import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.prototype.$utils = utils;


Vue.config.productionTip = false
Vue.prototype.baseUrl = '/api';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
  debugger;
  if(sessionStorage.getItem("token")){
    config.headers.token = sessionStorage.getItem("token")
  }

  return config;
}, error => {
// 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {

    return response;
  },
  error => {

    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.dispatch("setToken",'');
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });


