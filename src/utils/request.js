import axios from 'axios'
/**
 *{number} mobile
 *
 */
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})
export default instance
