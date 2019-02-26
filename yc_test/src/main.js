// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import "./assets/css/common/mianStyle.css"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.$axios = axios;
/*axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded'};*/
//设置token
axios.defaults.headers.common['token'] = "f4c902c9ae5a2a9d8f84868ad064e706"
//设置请求头
axios.defaults.headers.post["Content-type"] = "application/json"
// 请求拦截
axios.interceptors.request.use((config) => {
  config.headers={'Content-Type': 'application/x-www-form-urlencoded'};
  if(config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
//数据反回拦截
/*var resInterceptors = axios.interceptors.response.use((result) => {
  return result.data;
  // return result;
});
var resInterceptors = axios.interceptors.response.use((result) => {
  if(typeof result == 'string'){
    result = JSON.parse(result);
  }
  return result;
});*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
