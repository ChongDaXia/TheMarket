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

// 获取所有工资表信息
export const getSalary = params => {
    return axios ({
        url: '/staff/home/getSalary',
        method: 'get',
        params: params
    })
}

// 保存工资信息
export const addNewSalary = params => {
    return axios ({
        url: '/staff/home/saveSalary',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 更新工资单状态
export const updateSalary = params => {
    return axios ({
        url: '/staff/home/updateSalary',
        method: 'post',
        data: {
            ...params
        }
    })
}