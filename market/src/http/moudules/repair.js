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