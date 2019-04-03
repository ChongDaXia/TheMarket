import axios from '../axios'

// 登录
export const login = params => {
    return axios ({
        url:'/user/login',
        method:'post',
        data: {
            ...params
        }
    })
}
// 退出登录
export const loginout = () => {
    return axios ({
        url: '/loginout',
        method: 'get'
    })
}
