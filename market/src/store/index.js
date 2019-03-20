import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 全局访问的state对象
const state = {
    // 登录状态
    isLogin: false,
    // 用户id
    userId: window.sessionStorage.getItem('userId'),
    // 用户名
    username: window.sessionStorage.getItem('username')
}
// 实时监听state值的变化
const getters = {
    //获取登录状态
    isLogin: state => state.isLogin,
    // 获取用户id
    userId: state => state.userId,
    // 获取用户名
    username: state => state.username
}
// 自定义改变state初始值的方法（同步事务）
const mutations = {
    // 保存登录状态
    userStatus (state, data) {
        state.isLogin = data
    },
    // 保存用户id
    setUserId (state, date) {
        state.userId = date
    },
    // 保存用户名
    setUserName (state, data) {
        state.username =data
    }
}
// 自定义触发mutations里函数的方法，context和store实例具有相同的方法和属性（异步操作）
const actions = {
    // 改变登录状态
    setUserStatus ({commit}, data) {
        commit('userStatus', data)
    },
    // 改变用户id
    setUserId ({commit}, data) {
        commit('setUserId', data)
    },
    //改变用户名
    setUserName ({commit}, data) {
        commit('setUserName', data)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store
