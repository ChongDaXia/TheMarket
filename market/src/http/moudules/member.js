import axios from '../axios'

// 保存新增会员
export const addnewmember = params => {
    return axios ({
        url: '/member/home/addnewmember',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 更新会员
export const updatemember = params => {
    return axios ({
        url: '/member/home/updatemember',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 获取所有会员
export const getAllMember = params => {
    return axios ({
        url: '/member/home/getAllMember',
        method: 'get',
        params: params
    })
}