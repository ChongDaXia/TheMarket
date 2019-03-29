import axios from '../axios'

// 保存新增会员（会员管理）
export const addnewmember = params => {
    return axios ({
        url: '/member/home/addnewmember',
        method: 'post',
        params: params
    })
}