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
//获取员工
export const selectPurchaseStaff = params => {
    return axios ({
        url: '/staff/home/selectPurchaseStaff',
        method: 'get',
        params: params
    })
}