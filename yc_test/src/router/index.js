import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import  login from '@/components/login'
import  admin from '@/components/main'
import  key_indicators from '../components/managerView/key_indicators'
Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/hello',name: 'HelloWorld',component: HelloWorld},
    {path: '/login',name: 'login',component: login},
    {path: '/admin',name: 'admin',component: admin,
      //managerView
    children:[
      {path: '',name: 'key_indicators',component: key_indicators},
      {path: '/key_indicators',name: 'key_indicators',component: key_indicators}
    ]},

  ]
})
