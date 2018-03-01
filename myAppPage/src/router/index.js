import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: resolve => { require(['@/views/home/homepage'], resolve) }
    },
    {
      path: '/user',
      name: '个人中心',
      component: resolve => { require(['@/views/user/userpage'], resolve) }
    }
  ]
})
