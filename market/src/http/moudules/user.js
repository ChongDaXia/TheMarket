import axios from '../axios'

// 获取基本信息（主页）
export const getpersonalinfo = params => {
    return axios ({
        url:'/user/home/personalinfo1',
        method:'get',
        params: params
    })
}

// 保存基本信息（主页）
export const postpersonalinfo = params => {
    return axios ({
        url:'/user/home/personalinfo2',
        method:'post',
        params: params
    })
}

// 保存忘记密码（主页）
export const passwordchange = params => {
    return axios ({
        url: '/user/home/passwordchange',
        method: 'post',
        params: params
    })
}

// 保存新增用户（用户管理）
export const addnewuser = params => {
    return axios ({
        url: '/user/home/addnewuser',
        method: 'post',
        params: params
    })
}
