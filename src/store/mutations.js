import {
  ADD_TEL,
  SAVE_TOKEN,
  SAVE_ACCOUNT,
  SAVE_PROFILE
} from 'store/mutation-type.js'

export default {
  [ADD_TEL](state, mobileNumber) {
    state.loginTel = mobileNumber
  },
  [SAVE_TOKEN](state, token) {
    window.localStorage.setItem('token', token)
    state.token = token
  },
  [SAVE_ACCOUNT](state, account) {
    state.account = account
  },
  [SAVE_PROFILE](state, profile) {
    state.profile = SAVE_PROFILE
  }
}
