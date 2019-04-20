import Vue from 'vue'
import Router from 'vue-router'
// 引入项目的模块组件
import login from '@/components/login'
import home from '@/components/home'
import addsome from '@/components/addsome'
import goodsmanager from '@/components/goods/index'
import usermanager from '@/components/user/index'
import shopmanager from '@/components/shop/index'
import repairmanager from '@/components/repair/index'
import informmanager from '@/components/inform/index'

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
          path: '/addsome',
          name: 'addsome',
          component: addsome,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/usermanager',
          name: 'usermanager',
          component: usermanager,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/shopmanager',
          name: 'shopmanager',
          component: shopmanager,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/goodsmanager',
          name: 'goodsmanager',
          component: goodsmanager,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/repairmanager',
          name: 'repairmanager',
          component: repairmanager,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/informmanager',
          name: 'informmanager',
          component: informmanager,
          meta: {
            isLogin: true
          }
        }
      ]
    }
  ]
})
