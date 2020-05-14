<template>
  <div id="playlistSong">
    <player-head
      :name="{ main: initSong.name, vice: initSong.arName }"
      :to="headData.to"
      :color="headData.color"
      :share="headData.share"
      @back="hidePlayer"
    ></player-head>
    <audio ref="musicRef" autoplay hidden @ended="palyNext"></audio>
  </div>
</template>

<script>
import { playerPageApi } from 'request/api/index.js'
import PlayerHead from 'components/header/PlayerHead.vue'
import { SHOW_PLAYER, SAVE_SONG } from 'store/mutation-type.js'
export default {
  data() {
    return {
      // 头部组件属性对象
      headData: {
        name: {},
        isMultiline: true,
        to: false,
        color: '#fff',
        share: true
      },
      songId: '' // 歌曲id
    }
  },
  components: {
    PlayerHead
  },
  created() {
    // this.getMusic()
    // console.log(1)
  },
  updated() {
    this.getMusic(this.initSong.id)
    // console.log(2)
  },
  methods: {
    // 隐藏播放器
    hidePlayer() {
      this.$store.commit(SHOW_PLAYER, false)
    },
    // 获得音乐url
    async getMusic(songId) {
      // console.log(this)
      this.songId = songId
      const { data } = await playerPageApi.getMusicUrl(this.songId)
      this.$refs.musicRef.src = data.data[0].url
    },
    // 获得歌曲信息
    async getSongDetails(songId) {
      const { data } = await playerPageApi.getSongDetails(songId)
      // 保存歌曲信息到vuex
      this.$store.commit(SAVE_SONG, {
        id: data.songs[0].id,
        name: data.songs[0].name,
        arName: data.songs[0].ar[0].name,
        picUrl: data.songs[0].al.picUrl
      })
    },
    // 播放下一首
    palyNext() {
      var playlist = this.$store.state.playlist
      var index
      var len = playlist.length
      for (let i = 0; i < len; i++) {
        if (this.songId === playlist[i].id) {
          console.log(i)
          console.log(len)
          if (i === len - 1) {
            index = 0
          } else {
            index = i + 1
          }
          break
        }
      }
      this.getSongDetails(playlist[index].id)
      this.getMusic(playlist[index].id)
    }
  },
  computed: {
    initSong() {
      return this.$store.state.initSong
    },
    // 获得播放状态
    getPlayPause() {
      return this.$store.state.playPause
    }
  },
  watch: {
    // 控制播放暂停
    getPlayPause: function(val) {
      if (!val) {
        this.$refs.musicRef.pause()
      } else {
        this.$refs.musicRef.play()
      }
    }
  }
}
</script>

<style>
#playlistSong {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: brown;
}
</style>
