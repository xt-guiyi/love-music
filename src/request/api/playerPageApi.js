import axios from 'request/http'

const playerPageApi = {
  // 获取音乐url
  getMusicUrl: id => {
    return axios.get(`/song/url?id=${id}`)
  },
  // 获得歌曲详细星信
  getSongDetails: id => {
    return axios.get(`/song/detail?ids=${id}`)
  }
}

export default playerPageApi
