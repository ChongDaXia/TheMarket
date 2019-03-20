import axios from '../axios'

// 菜单管理
export const findMenuTree = () => {
    return axios ({
        url: '/menu/findTree',
        method: 'get'
    })
}
