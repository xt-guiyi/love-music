import Vue from 'vue'
import Vuex from 'vuex'
import mutations from 'store/mutations.js'
Vue.use(Vuex)

const state = {
  loginTel: '', // 登录手机号
  token: '', // 这就不用解释了吧
  account: {}, // 账户
  profile: {} // 轮廓描述,包含账号更具体信息
}
export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {}
})
