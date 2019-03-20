import axios from 'axios'

axios.default.headers.post['Content-Type']='application/x-www-from-urlencoded;charset=UTF-8'
axios.default.baseURL='http://localhost:8080';

export default axios
