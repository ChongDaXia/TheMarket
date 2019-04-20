import axios from '../axios'

// 保存新增员工（员工管理）
export const addnewstaff = params => {
    return axios ({
        url: '/staff/home/addnewstaff',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 获取所有员工信息
export const getAllStaff = params => {
    return axios ({
        url: '/staff/home/getAllStaff',
        method: 'get',
        params: params
    })
}

//获取员工
export const selectPurchaseStaff = params => {
    return axios ({
        url: '/staff/home/selectPurchaseStaff',
        method: 'get',
        params: params
    })
}

// 更新员工信息
export const updatestaff = params => {
    return axios ({
        url: '/staff/home/updatestaff',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 更新任职表信息
export const updatetakeoffice = params => {
    return axios ({
        url: '/staff/home/updatetakeoffice',
        method: 'post',
        data: {
            ...params
        }
    })
}