import {
  ADD_TEL,
  SAVE_TOKEN,
  SAVE_ACCOUNT,
  SAVE_PROFILE,
  SAVE_SONG_SHEET,
  SAVE_SONG,
  SHOW_OPERATION_SONG,
  SHOW_PLAYER,
  PLAY_PAUSE,
  JUKEBOX_STOP,
  PLAYLIST,
  PERCENT_TIME
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
    state.profile = profile
  },
  [SAVE_SONG_SHEET](state, profile) {
    state.initSongSheet = profile
  },
  [SAVE_SONG](state, profile) {
    state.initSong = profile
  },
  [SHOW_OPERATION_SONG](state, profile) {
    state.isShowOperationSong = profile
  },
  [SHOW_PLAYER](state, profile) {
    state.isShowPlayer = profile
  },
  [PLAY_PAUSE](state, profile) {
    state.playObj.playPause = profile
  },
  [JUKEBOX_STOP](state, profile) {
    state.playObj.jukeboxStop = profile
  },
  [PLAYLIST](state, profile) {
    state.playObj.playlist = profile
  },
  [PERCENT_TIME](state, profile) {
    state.playObj.percentTime = profile
  }
}
