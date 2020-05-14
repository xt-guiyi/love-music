import axios from 'request/http'

const findPageApi = {
  // 发现页轮播图
  bannerSwiper: () => {
    return axios.get('/banner?type=1')
  },
  // 推荐歌单
  personalizedSong: () => {
    return axios.get('/personalized?limit=6')
  },
  // 新歌
  personalizedNewSong: () => {
    return axios.get('/personalized/newsong')
  },
  // 新碟
  personalizedNewDish: () => {
    return axios.get('/top/album?offset=0&limit=10')
  }
}

export default findPageApi
