// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
// 引入vuex
import store from './store'
// 引入iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 引入echarts
// import ECharts from 'vue-echarts/components/ECharts'
import echarts from 'echarts'
// 引入粒子背景
import VueParticles from  'vue-particles'

Vue.config.productionTip = false
Vue.use(iView)
// Vue.component('v-chart', ECharts)
Vue.prototype.$echarts=echarts
Vue.use(VueParticles) 

router.beforeEach((to, from, next) => {
  // 获取用户登录成功后的状态
  let getFlag = localStorage.getItem('Flag')

  // 已登录
  if (getFlag === 'isLogin') {
    // 登录后修改状态值
    store.dispatch('setUserStatus', true)
    next()
    // 如果想进入无需登录的页面（如注册），则定向回到首页
    if (!to.meta.isLogin) {
      iView.Message.error('请先退出登录')
      next({
        path: '/'
      })
    }
  } else {
  // 未登录
    // 想进入需要登录的页面（如主页），将定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/login'
      })
      iView.Message.info('请先登录')
    // 想进入无需登录的页面（如注册），跳转继续
    } else {
      next()
    }
  }
})
router.afterEach(route => {
  window.scroll(0, 0)
})
// 退出登录
// localStorage.removeItem("Flag")

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
