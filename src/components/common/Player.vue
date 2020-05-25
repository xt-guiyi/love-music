<template>
  <div id="playlistSong">
    <div data-v-b7471128="" class="background">
      <img width="100%" height="100%" :src="initSong.picUrl" />
    </div>
    <player-head
      :name="{ main: initSong.name, vice: initSong.arName }"
      :to="headData.to"
      :color="headData.color"
      :share="headData.share"
      @back="hidePlayer"
    ></player-head>
    <main class="jukebox">
      <!-- 唱片区 -->
      <div v-show="!changeLyric" style="height:100%">
        <div style="height:90%" @click="changeLyric = true">
          <span class="Stylus" ref="StylusRef"></span>
          <div class="machine">
            <div class="chassis"></div>
            <div
              class="recordDisc "
              :class="[
                this.$store.state.playObj.playPause
                  ? 'animationStart'
                  : 'animationStop'
              ]"
            >
              <span
                :style="{
                  backgroundImage: 'url(' + initSong.picUrl + ')'
                }"
              ></span>
            </div>
          </div>
        </div>
        <div class="menuBar">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <!-- 歌词区 -->
      <div
        v-show="changeLyric"
        style="height:90%"
        @click.prevent="changeLyric = false"
      >
        <scroll-view
          ref="lyricList"
          class="wrap"
          :probeType="scrollViewData.probeType"
          :bounce="scrollViewData.bounce"
          :listenScroll="scrollViewData.listenScroll"
          :touchEndAfter="scrollViewData.touchEndAfter"
        >
          <div
            class="content"
            @touchmove.prevent="moveStart"
            @touchend.prevent="moveStop"
          >
            <ul class="text" v-if="!isLyric">
              <li ref="lyricLine">暂时没有歌词，<u>求歌词</u></li>
            </ul>
            <ul class="text" v-else-if="isSupportNoRoll">
              <li
                v-for="(item, index) in lrcData"
                ref="lyricLine"
                :key="index"
                :class="{ current: currentLineNum === index }"
              >
                {{ item.text }}
              </li>
            </ul>
            <ul class="text" v-else>
              <li style="font-size:2rem; color:#fff">*该歌词不支持自动滚动</li>
              <li
                v-for="(item, index) in noRollLyric"
                ref="lyricLine"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </scroll-view>
      </div>
    </main>
    <footer class="bottomContent">
      <div class="progressBar">
        <player-progress-bar
          :currentTime="currentTime"
          :duration="duration"
          :percent="percent"
          @percentChange="percentChange"
        ></player-progress-bar>
      </div>
      <div class="playBar">
        <span></span>
        <span @touchend.prevent="lastSong"></span>
        <span
          @touchend.prevent="play"
          :class="{ playImage: this.$store.state.playObj.playPause }"
        ></span>
        <span @touchend.prevent="nextSong"></span>
        <span></span>
      </div>
    </footer>
    <audio
      ref="musicRef"
      autoplay
      hidden
      @ended="palyNext"
      @canplay="ready"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import Lyrics from 'lyrics.js'
import { playerPageApi } from 'request/api/index.js'
import PlayerHead from 'components/header/PlayerHead.vue'
import {
  SHOW_PLAYER,
  SAVE_SONG,
  SHOW_OPERATION_SONG,
  PLAY_PAUSE,
  JUKEBOX_STOP
} from 'store/mutation-type.js'
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
      // 滚动组件属性对象
      scrollViewData: {
        probeType: 3,
        bounce: false,
        listenScroll: true,
        touchEndAfter: true
      },
      songId: '', // 歌曲id
      songReady: false, // 歌曲请求成功
      pausedOrigin: true, // 暂停来源，只有播放暂停键才能为true,其他为false
      currentTime: 0, // 现在播放时间
      duration: 0, // 总时间
      changeLyric: false, // 切换歌词
      lrcData: {}, // 歌词
      lrc: {}, // Lyrics实例对象
      currentLineNum: 0, // 歌词索引
      isMove: false, // 歌词是否被手指滑动
      isLyric: true, // 是否有歌词
      isSupportNoRoll: true, // 歌词是否支持自动滑动
      noRollLyric: [] // 不支持滚动的歌词
    }
  },
  components: {
    PlayerHead
  },
  created() {},
  mounted() {},
  updated() {
    // 300毫秒启动歌曲操作栏
    if (this.$store.state.isShowOperationSong === false) {
      var timeout = setTimeout(() => {
        this.$store.commit(SHOW_OPERATION_SONG, true)
        clearTimeout(timeout)
      }, 300)
    }
  },
  methods: {
    // 隐藏播放器
    hidePlayer() {
      this.$store.commit(SHOW_PLAYER, false)
    },

    // 播放歌曲
    async getMusic(songId) {
      this.songId = songId
      // 获得音乐url
      const { data } = await playerPageApi.getMusicUrl(this.songId)
      // console.log(data.data[0])
      this.$refs.musicRef.src = data.data[0].url
    },

    // 获取歌词
    async getLyricInfo(songId) {
      // 获得歌词
      const { data } = await playerPageApi.getLyric(songId)
      var patt1 = /\[(\d+:.+?)\]/g
      // 判断是否有歌词
      // console.log(data)
      if (!data.lrc) {
        this.isLyric = false
      } else if (!patt1.test(data.lrc.lyric)) {
        // 判断歌词是否支持歌词滚动
        this.isLyric = true
        this.isSupportNoRoll = false
        this.noRollLyric = data.lrc.lyric.split('\n')
      } else {
        this.isSupportNoRoll = true
        this.isLyric = true
        // Lyrics为歌词解析js库,使用方法Github查找
        this.lrc = new Lyrics(data.lrc.lyric)
        this.lrcData = this.lrc.lyrics_all
      }
    },

    // 播放暂替
    play(origin = true) {
      this.pausedOrigin = origin
      this.$store.commit(JUKEBOX_STOP, !this.$store.state.playObj.jukeboxStop)
      this.$store.commit(PLAY_PAUSE, !this.$store.state.playObj.playPause)
    },

    // 播放下一首
    nextSong() {
      // 歌曲没缓存则点击无效
      if (!this.songReady) {
        return
      }
      // 当暂停的时候点击下一曲，更改图标
      if (!this.$store.state.playObj.playPause) {
        this.play(false)
      }
      this.palyNext(true)
    },

    // 播放上一首
    lastSong() {
      if (!this.songReady) {
        return
      }
      if (!this.$store.state.playObj.playPause) {
        this.play(false)
      }
      this.palyNext(false)
    },

    // 获得歌曲信息
    async getSongDetails(songId) {
      const { data } = await playerPageApi.getSongDetails(songId)
      // console.log(data)
      // 保存歌曲信息到vuex
      this.$store.commit(SAVE_SONG, {
        id: data.songs[0].id,
        name: data.songs[0].name,
        arName: data.songs[0].ar[0].name,
        picUrl: data.songs[0].al.picUrl
      })
    },

    // 自动播放 next为播放上一首还是下一首，默认为true
    palyNext(next = true) {
      var playlist = this.$store.state.playObj.playlist
      var index
      var len = playlist.length
      for (let i = 0; i < len; i++) {
        if (this.songId === playlist[i].id) {
          // 播放下一首
          if (next) {
            if (i === len - 1) {
              index = 0
            } else {
              index = i + 1
            }
            break
          } else {
            // 播放上一首
            if (i === 0) {
              index = len - 1
            } else {
              index = i - 1
            }
            break
          }
        }
      }
      this.getSongDetails(playlist[index].id)
    },
    // 缓冲成功
    ready(e) {
      this.songReady = true
      // 获得音乐总时间
      var timer = setTimeout(() => {
        this.duration = e.target.duration
        clearTimeout(timer)
      }, 400)
    },

    // 更新播放进度
    updateTime(e) {
      // 获得播放时间
      this.currentTime = e.target.currentTime
      // 更新歌词索引，滚动到指定位置
      // 歌词若能滑动且有歌词
      if (this.isSupportNoRoll && this.isLyric) {
        this.currentLineNum = this.lrc.select(this.currentTime)
        if (!this.isMove) {
          if (this.currentLineNum > 5) {
            // v-for循环，所以this.$refs.lyricLine是一个数组，从而获取相应DOM
            const lyricEl = this.$refs.lyricLine[this.currentLineNum - 5]
            // 调用scroll组件API
            this.$refs.lyricList.scrollToElement(lyricEl, 2000)
          } else {
            // 如果小于5，则滚动制顶部
            this.$refs.lyricList.scrollTo(0, 0, 1000)
          }
        }
      }
    },

    moveStart() {
      this.isMove = true
    },

    moveStop() {
      const time = setTimeout(() => {
        this.isMove = false
        clearTimeout(time)
      }, 2000)
    },
    // 改变歌曲进度
    percentChange(percent) {
      // 根据百分比算出当前播放时间
      const currentTime = this.duration * percent
      // 赋值给audio
      this.$refs.musicRef.currentTime = currentTime
      // 如果未播放，则播放
      if (!this.$store.state.playObj.playPause) {
        this.play(true)
      }
    }
  },
  computed: {
    initSong() {
      return this.$store.state.initSong
    },
    // 获得播放状态
    getPlayPause() {
      return this.$store.state.playObj.playPause
    },
    // 进度条比例
    percent() {
      return this.currentTime / this.duration
    }
  },
  watch: {
    // 监听歌曲数据变化
    initSong(val) {
      this.getMusic(val.id)
      this.getLyricInfo(val.id)
    },
    // 控制播放暂停
    getPlayPause: function(val) {
      if (this.pausedOrigin) {
        if (val) {
          this.$refs.musicRef.play()
          this.$refs.StylusRef.style.transform = 'rotate(23deg)'
        } else {
          this.$refs.musicRef.pause()
          this.$refs.StylusRef.style.transform = 'rotate(0deg)'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#playlistSong {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #222;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }
}

.jukebox {
  width: 100%;
  height: 78%;
  position: relative;
  .Stylus {
    width: 20rem;
    height: 20rem;
    position: absolute;
    top: 0;
    left: calc(50%);
    z-index: 999;
    background: url('~assets/images/playerPage/Stylus.svg') no-repeat;
    background-size: 80%;
    transform: rotate(23deg);
    transform-origin: 0% 0%;
    transition: transform 0.5s;
  }
  .machine {
    width: 100%;
    height: 28.5rem;
    position: absolute;
    top: 10rem;
    .chassis {
      height: 28.5rem;
      width: 28.5rem;
      background: hsla(0, 0%, 100%, 0.1);
      border-radius: 50%;
      margin: 0 auto;
    }
    .recordDisc {
      height: 28rem;
      width: 28rem;
      border-radius: 50%;
      position: absolute;
      top: calc(50% - 14rem);
      left: calc(50% - 14rem);
      background: url('~assets/images/playerPage/cdWrapper.svg') no-repeat;
      background-size: 100%;
      animation: rotate 20s linear infinite;
      span {
        display: inline-block;
        width: 68%;
        height: 68%;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: 100%;
        position: absolute;
        top: calc(50% - 34%);
        left: calc(50% - 34%);
      }

      @keyframes rotate {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .animationStop {
      animation-play-state: paused;
    }
    .animationStart {
      animation-play-state: running;
    }
  }

  .menuBar {
    width: 90%;
    height: 10%;
    position: absolute;
    bottom: 0;
    left: calc(50% - 45%);
    display: flex;
    span {
      flex: 1;
    }
    span:nth-of-type(1) {
      @include bis(
        $url: '~assets/images/playerPage/like.svg',
        $size: 40%,
        $position: center
      );
    }
    span:nth-of-type(2) {
      @include bis(
        $url: '~assets/images/playerPage/download.svg',
        $size: 40%,
        $position: center
      );
    }
    span:nth-of-type(3) {
      @include bis(
        $url: '~assets/images/playerPage/ringTone.svg',
        $size: 45%,
        $position: center
      );
    }
    span:nth-of-type(4) {
      @include bis(
        $url: '~assets/images/playerPage/comment.svg',
        $size: 40%,
        $position: center
      );
    }
    span:nth-of-type(5) {
      @include bis(
        $url: '~assets/images/playerPage/menu.svg',
        $size: 45%,
        $position: center
      );
      transform: rotate(90deg);
    }
  }
  .wrap {
    height: 100%;
    overflow: hidden;
    .content {
      width: 80%;
      margin: 0 auto;
      text-align: center;

      .text {
        list-style: none;
        line-height: 3.2rem;
        color: hsla(0, 0%, 100%, 0.5);
        font-size: 1.6rem;
        padding-top: 10rem;
        .current {
          font-size: 2rem;
          color: $netease-color-two;
        }
      }
    }
  }
}

.bottomContent {
  width: 100%;
  height: 14%;
  .progressBar {
    width: 90%;
    height: 20%;
    margin: 0 auto;
  }
  .playBar {
    width: 90%;
    height: 80%;
    margin: 0 auto;
    display: flex;
    span {
      flex: 1;
    }
    span:nth-of-type(1) {
      @include bis(
        $url: '~assets/images/playerPage/loopPlay.svg',
        $size: 40%,
        $position: center
      );
    }
    span:nth-of-type(2) {
      @include bis(
        $url: '~assets/images/playerPage/lastSong.svg',
        $size: 40%,
        $position: center
      );
    }
    span:nth-of-type(3) {
      @include bis(
        $url: '~assets/images/playerPage/play.svg',
        $size: 80%,
        $position: center
      );
    }
    span:nth-of-type(4) {
      @include bis(
        $url: '~assets/images/playerPage/nextSong.svg',
        $size: 40%,
        $position: center
      );
    }
    span:nth-of-type(5) {
      @include bis(
        $url: '~assets/images/playerPage/playlist.svg',
        $size: 45%,
        $position: center
      );
    }
    .playImage {
      background-image: url('~assets/images/playerPage/suspend.svg') !important;
      background-size: 91% !important;
    }
  }
}
</style>
