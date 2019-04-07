import axios from '../axios'

// 保存维修申请（维修管理）
export const addnewrepair = params => {
    return axios ({
        url: '/repair/home/addnewrepair',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 获取维修单（维修管理）
export const getrepairorder = params => {
    return axios ({
        url: '/repair/home/getrepairorder',
        method: 'get',
        params: params
    })
}

//获取维修表（维修管理）
export const getrepair = params => {
    return axios ({
        url: '/repair/home/getrepair',
        method: 'get',
        params: params
    })
}
