import axios from '../axios'

// 保存新增门店（门店管理）
export const addnewstore = params => {
    return axios ({
        url: '/store/home/addnewstore',
        method: 'post',
        data: {
            ...params
        }
    })
}
