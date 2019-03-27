import axios from '../axios'

//测试连接
export const testnet = () => {
    return axios ({
        url:'/user/test1',
        method:'get'
    })
}

// 登录
export const login = params => {
    return axios ({
        url:'/user/login',
        method:'get',
        params: params
    })
}
// 退出登录
export const loginout = () => {
    return axios ({
        url: '/loginout',
        method: 'get'
    })
}
