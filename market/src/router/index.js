import Vue from 'vue'
import Router from 'vue-router'
// 引入项目的模块组件
import login from '@/components/login'
import home from '@/components/home'
import pageindex from '@/components/pageindex'
import usermanager from '@/components/user/index'
import shopmanager from '@/components/shop/index'
import goodsmanager from '@/components/goods/index'
import staffmanager from '@/components/staff/index'
import membermanager from '@/components/member/index'
import repairmanager from '@/components/repair/index'
import informmanager from '@/components/inform/index'
import financemanager from '@/components/finance/index'

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
          path: '/pageindex',
          name: 'pageindex',
          component: pageindex,
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
          path: '/staffmanager',
          name: 'staffmanager',
          component: staffmanager,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/membermanager',
          name: 'membermanager',
          component: membermanager,
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
        },
        {
          path: '/financemanager',
          name: 'financemanager',
          component: financemanager,
          meta: {
            isLogin: true
          }
        }
      ]
    }
  ]
})
