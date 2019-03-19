import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 全局访问的state对象
const state = {
    // 登录状态
    isLogin: false
}
// 实时监听state值的变化
const getters = {
    //获取登录状态
    isLogin: state => state.isLogin
}
// 自定义改变state初始值的方法（同步事务）
const mutations = {
    userStatus (state, data) {
        state.isLogin = data
    }
}
// 自定义触发mutations里函数的方法，context和store实例具有相同的方法和属性（异步操作）
const actions = {
    setUserStatus ({commit}, data) {
        commit('userStatus', data)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store
