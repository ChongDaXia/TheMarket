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

// 获取所有门店
export const getAllStore = params => {
    return axios ({
        url: '/store/home/getAllStore',
        method: 'get',
        params: params
    })
}

// 获取一个门店
export const getOneStore = params => {
    return axios ({
        url: '/store/home/getOneStore',
        method: 'get',
        params: params
    })
}

//获取所有租赁表
export const getAllRent = params => {
    return axios ({
        url: '/store/home/getAllRent',
        method: 'get',
        params: params
    })
}

// 获取一个租赁表
export const getOneRent = params => {
    return axios ({
        url: '/store/home/getOneRent',
        method: 'get',
        params: params
    })
}

// 获取已租售的店铺
export const getStoreRent = params => {
    return axios ({
        url: '/store/home/getStoreRent',
        method: 'get',
        params: params
    })
}

// 删除店铺
export const deleteOneStore = params => {
    return axios ({
        url: '/store/home/deleteOneStore',
        method: 'get',
        params: params
    })
}

// 删除租赁表
export const deleteRent = params => {
    return axios ({
        url: '/store/home/deleteRent',
        method: 'get',
        params: params
    })
}

// 更新门店信息
export const updateStore = params => {
    return axios ({
        url: '/store/home/updateStore',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 更保存新租赁表
export const saveNewRent = params => {
    return axios ({
        url: '/store/home/addnewrent',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 更新租赁表
export const updateRent = params => {
    return axios ({
        url: '/store/home/updateRent',
        method: 'post',
        data: {
            ...params
        }
    })
}