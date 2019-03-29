import axios from '../axios'

// 保存新增员工（员工管理）
export const addnewstaff = params => {
    return axios ({
        url: '/staff/home/addnewstaff',
        method: 'post',
        params: params
    })
}