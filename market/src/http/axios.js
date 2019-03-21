import axios from 'axios'
import qs from 'qs'

// 响应时间
axios.defaults.timeout = 5000;
// 请求头格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 接口地址
axios.defaults.baseURL = 'http://localhost:8085';

// post传参序列化（添加请求拦截器）
axios.interceptors.request.use ((config) => {
    // 在发送请求之前,转为json格式
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}), (error) => {
    return Promise.reject(error)
}
// 返回状态判断（添加响应拦截器）
axios.interceptors.response.use ((res) => {
    // 对响应数据做些事
    if (!res.data.success) {
        return Promise.reject(res)
    }
    return res
}), (error) => {
    return Promise.reject(error)
}
// 返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
// 返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default axios
