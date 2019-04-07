import axios from '../axios'

// 更新用户
export const updateUser = params => {
    return axios ({
        url:'/user/home/updateUser',
        method:'post',
        data: {
            ...params
        }
    })
}

// 保存新增用户
export const addnewuser = params => {
    return axios ({
        url: '/user/home/addnewuser',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 获取所有用户
export const getAllUser = params => {
    return axios ({
        url: '/user/home/getAllUser',
        method: 'get',
        params: params
    })
}

// 获取单个用户
export const getOnceUser =params => {
    return axios ({
        url: '/user/home/getOnceUser',
        method: 'get',
        params: params
    })
}
