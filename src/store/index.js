import Vue from 'vue'
import Vuex from 'vuex'
import mutations from 'store/mutations.js'
Vue.use(Vuex)

const state = {
  loginTel: '', // 登录手机号
  token: '', // 这就不用解释了吧
  account: {}, // 账户
  profile: {}, // 轮廓描述,包含账号更具体信息
  initSongSheet: {}, // 初始化歌单详情数据包含id和歌单名
  initSong: {}, //  初始化歌曲信息
  isShowOperationSong: false, // 是否显示歌曲操作栏
  isShowPlayer: false, // 是否显示播放器
  // 播放器对象
  playObj: {
    playPause: true, // 播放暂停
    jukeboxStop: true, // 唱片机暂停
    playlist: [], // 播放列表
    percentTime: 0 // 当前播放时间
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {}
})
