import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 全局访问的state对象
const state = {
    // 登录状态
    isLogin: false,
    // 用户id
    userId: localStorage.getItem('userId'),
    // 用户角色
    role: localStorage.getItem('role'),
    // 当前菜单
    selectmemu: localStorage.getItem('selectmemu'),
    // 导航菜单
    memuTree: []
}
// 实时监听state值的变化
const getters = {
    //获取登录状态
    isLogin: state => state.isLogin,
    // 获取用户id
    userId: state => state.userId,
    // 用户角色
    role: state => state.role,
    // 当前菜单
    selectmemu: state => state.selectmemu,
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
    // 保存用户角色
    setRole (state, data) {
        state.role = data
    },
    // 当前菜单
    setSelectMemu (state, data) {
        state.selectmemu = data
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
    // 改变用户角色
    setRole ({commit}, data) {
        commit('setRole', data)
    },
    // 改变当前菜单
    setSelectMemu ({commit}, data) {
        commit('setSelectMemu', data)
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
