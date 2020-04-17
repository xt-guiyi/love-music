import axios from 'request/http'

const loginApi = {
  // 手机登录
  mobileLogin: data => {
    // data.timestamp = new Date().getTime()
    return axios.get('/login/cellphone', { params: data })
  }
}

export default loginApi
