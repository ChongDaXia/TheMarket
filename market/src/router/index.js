import Vue from 'vue'
import Router from 'vue-router'
// 引入项目的模块组件
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        isLogin: true
      }
    }
  ]
})
