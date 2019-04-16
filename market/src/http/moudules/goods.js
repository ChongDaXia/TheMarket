import axios from '../axios'

// 保存新增商品（商品管理）
export const addnewgoods = params => {
    return axios ({
        url: '/goods/home/addnewgoods',
        method: 'post',
        data: {
            ...params
        }
    })
}
// 获取所有商品
export const getAllgoods = params => {
    return axios ({
        url: '/goods/home/getallgoods',
        method: 'get',
        params: params
    })
}
// 获取一个商品
export const getOnegoods = params => {
    return axios ({
        url: '/goods/home/getonegoods',
        method: 'get',
        params: params
    })
}
// 更新商品信息
export const updategoods = params => {
    return axios ({
        url: '/goods/home/updategoods',
        method: 'post',
        data: {
            ...params
        }
    })
}
// 保存新增供应商信息
export const addnewsupplier =params => {
    return axios ({
        url: '/goods/home/addnewsupplier',
        method: 'post',
        data: {
            ...params
        }
    })
}
// 获取所有供应商信息
export const getAllsupplier = params => {
    return axios ({
        url: '/goods/home/getallsupplier',
        method: 'get',
        params: params
    })
}
// 获取一个供应商信息
export const getOnesupplier = params => {
    return axios ({
        url: '/goods/home/getonesupplier',
        method: 'get',
        params: params
    })
}
// 更新供应商信息
export const updatesupplier = params => {
    return axios ({
        url: '/goods/home/updatesupplier',
        method: 'post',
        data: {
            ...params
        }
    })
}

//获取店铺的所有商品
export const selectGoods = params => {
    return axios ({
        url: '/goods/home/selectGoods',
        method: 'get',
        params: params
    })
}