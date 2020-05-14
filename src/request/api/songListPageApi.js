import axios from 'request/http'

const songListPageApi = {
  // 歌单详细页
  playlistDetails: id => {
    return axios.get(`/playlist/detail?id=${id}`)
  }
}

export default songListPageApi
