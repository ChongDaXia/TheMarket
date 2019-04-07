import Vue from 'vue'
import Router from 'vue-router'
// 引入项目的模块组件
import login from '@/components/login'
import home from '@/components/home'
import addsome from '@/components/addsome'
import showlist from '@/components/showlist'
import repairlist from '@/components/repairlist'
import echarts from '@/components/echarts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        isLogin: true
      },
      children: [
        {
          path: '/showlist',
          name: 'showlist',
          component: showlist,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/addsome',
          name: 'addsome',
          component: addsome,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/repairlist',
          name: 'repairlist',
          component: repairlist,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: echarts,
          meta: {
            isLogin: true
          }
        }
      ]
    }
  ]
})
