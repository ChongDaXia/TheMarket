import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 全局访问的state对象
const state = {
    // 登录状态
    isLogin: false,
    // 用户id
    userId: localStorage.getItem('userId'),
    // 用户名
    username: localStorage.getItem('username'),
    // 导航菜单
    memuTree: []
}
// 实时监听state值的变化
const getters = {
    //获取登录状态
    isLogin: state => state.isLogin,
    // 获取用户id
    userId: state => state.userId,
    // 获取用户名
    username: state => state.username,
    // 获取导航菜单
    memuTree: state => state.memuTree
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
        state.username = data
    },
    // 保存导航菜单
    setMenuTree (state, data) {
        state.memuTree = data
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
    },
    // 改变导航菜单
    setMenuTree ({commit}, data) {
        commit('setMenuTree', data)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store
