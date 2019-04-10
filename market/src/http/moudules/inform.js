import axios from '../axios'

// 保存发送通知（通知管理）
export const addnewinform = params => {
    return axios ({
        url: '/inform/home/addnewinform',
        method: 'post',
        data: {
            ...params
        }
    })
}
// 获取所有通知
export const getallinform = params => {
    return axios ({
        url: '/inform/home/getallinform',
        method: 'get',
        params: params
    })
}
// 获取所有通知单
export const getalljoborder = params => {
    return axios ({
        url: '/inform/home/getalljoborder',
        method: 'get',
        params: params
    })
}
// 获取管理员通知
export const getjoborderadmin = params => {
    return axios ({
        url: '/inform/home/getjoborderadmin',
        method: 'get',
        params: params
    })
}