/*
 * axios封装
 * 请求拦截，响应拦截,错误回调统一处理
 */

import axios from 'axios'
// 使用toast插件
import Vue from 'vue'

// base地址
axios.defaults.baseURL = 'http://123.56.98.236:3000'

// 请求失败处理
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 501：没有这个账号
    case 501:
      Vue.prototype.$toast('账号不存在')
      break
    case 502:
      Vue.prototype.$toast('网络错误')
      break
    //  509 登录错误超过限制
    case 509:
      Vue.prototype.$toast('您操作的太快了，请休息一会在操作')
      break
    default:
      Vue.prototype.$toast(other)
  }
}

// 创建axios实例
var instance = axios.create({ timeout: 10000 })
// 在instance上设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response) {
      errorHandle(response.status, response.data.message)
    } else {
      // 断网处理
      Vue.prototype.$toast('请连接网络')
    }
    return error
  }
)
export default instance
