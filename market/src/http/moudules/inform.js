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