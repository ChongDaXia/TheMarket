import axios from '../axios'

// 保存新增商品（商品管理）
export const addnewgoods = params => {
    return axios ({
        url: '/goods/home/addnewgoods',
        method: 'post',
        params: params
    })
}