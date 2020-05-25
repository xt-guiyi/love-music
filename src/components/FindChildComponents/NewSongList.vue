<template>
  <section id="newSongbar">
    <div class="bar">
      <time>{{ Daily }}</time>
      <div class="title clearfix">
        <div class="switch">
          <span :class="{ active: songType }" @click="songType = true"
            >新歌</span
          >
          |
          <span :class="{ active: !songType }" @click="songType = false"
            >新碟</span
          >
        </div>
        <div class="more">
          <span v-show="songType">更多新歌</span>
          <span v-show="!songType">更多新碟</span>
        </div>
      </div>
    </div>
    <div class="content ">
      <!-- 新歌 -->
      <div
        class="list"
        v-show="songType"
        @touchstart="saveX"
        @touchend="slide"
        @touchmove="moveImg"
        :style="listStyle"
      >
        <div
          class="items"
          v-for="(item, index) in newSongData"
          :key="index"
          @touchmove="slipDetection"
          @touchend="playMusic(item)"
        >
          <img v-lazy="item.picUrl" ontouchend="return false" />
          <div class="detailedInfo">
            <p>
              {{ item.name }}
              <span>-{{ item.song.artists[0].name }}</span>
            </p>
            <p>
              <span>{{ item.song.alias[0] }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 新碟 -->
      <div
        class="list"
        v-show="!songType"
        @touchstart="saveX"
        @touchend="slide"
        @touchmove="moveImg"
        :style="listStyle"
      >
        <div class="items" v-for="(item, index) in newSongDish" :key="index">
          <img v-lazy="item.picUrl" />
          <div class="detailedInfo">
            <p>
              {{ item.name }}
              <span>-{{ item.artists[0].name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  SAVE_SONG,
  SHOW_PLAYER,
  JUKEBOX_STOP,
  PLAY_PAUSE
} from 'store/mutation-type.js'
export default {
  name: 'NewSongList',
  data() {
    return {
      songType: true, // 歌曲类型
      start: {
        x: 0
      },
      index: 0,
      listStyle: {},
      isMove: false // 是否滑动
    }
  },
  props: {
    newSongData: {
      type: Array,
      default: () => []
    },
    newSongDish: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 触摸开始
    saveX(e) {
      this.start.x = e.changedTouches[0].pageX
    },
    // 触摸持续
    moveImg(e) {
      // 移动距离
      var distanceX = e.changedTouches[0].pageX - this.start.x
      // 判断是否达到尽头
      if (distanceX < 0) {
        if (this.index === 4) {
          return false
        }
      } else {
        if (this.index === 0) {
          return false
        }
      }
      this.setMoveStyle(distanceX)
    },
    // 触摸结束
    slide(e) {
      var distanceX = e.changedTouches[0].pageX - this.start.x
      if (distanceX < 0) {
        if (this.index === 4) {
          return false
        }
        this.index++
        this.setMoveStyle(0, 0.4)
      } else if (distanceX > 0) {
        if (this.index === 0) {
          return false
        }
        this.index--
        this.setMoveStyle(0, 0.4)
      }
    },
    // 设置样式
    setMoveStyle(distanceX = 0, time = 0) {
      this.listStyle = {
        transform: `translateX(${-this.index * this.mobileWidth * 0.9 +
          distanceX}px)`,
        transition: `transform ${time}s`
      }
    },
    // 检测滑动
    slipDetection() {
      this.isMove = true
    },
    // 播放音乐
    async playMusic(item) {
      // 如果用户没有滑动且不是点击的同一个歌曲，则更新歌曲信息
      if (!this.isMove && this.musicID !== item.id) {
        this.musicID = item.id
        // 保存歌曲信息到vuex
        this.$store.commit(SAVE_SONG, {
          id: item.id,
          name: item.name,
          arName: item.song.artists[0].name,
          picUrl: item.picUrl
        })
        // 如果播放器和操作歌曲组件都没有打开，则打开播器
        if (
          this.$store.state.isShowOperationSong === false &&
          this.$store.state.isShowPlayer === false
        ) {
          this.$store.commit(SHOW_PLAYER, true)
        }
      } else if (!this.isMove) {
        // 如果点击的歌曲是同一个歌曲则只打开播放器
        this.$store.commit(SHOW_PLAYER, true)
      }
      // 如果在在暂停中则切换为播放图标
      if (!this.$store.state.playObj.playPause) {
        this.$store.commit(JUKEBOX_STOP, !this.$store.state.playObj.jukeboxStop)
        this.$store.commit(PLAY_PAUSE, !this.$store.state.playObj.playPause)
      }
      this.isMove = false
    }
  },
  computed: {
    Daily() {
      var date = new Date()
      return date.getMonth() + 1 + '月' + date.getDate() + '日'
    },
    mobileWidth() {
      return document.body.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#newSongbar {
  width: 100%;
  margin-top: 4rem;
  .bar {
    width: 90%;
    margin: auto;
    time {
      width: 90%;
      margin: auto;
      color: $netease-color-five;
    }
  }
}
.title {
  .switch {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.4rem;
    font-weight: bold;
    color: $netease-color-five;
    float: left;
    .active {
      color: #000;
    }
  }
  .more {
    height: 1.6rem;
    line-height: 1.6rem;
    padding: 0.1rem 0.6rem;
    border: 1px solid $netease-color-five;
    border-radius: 20rem;
    float: right;
  }
}

.content {
  width: 100%;
  overflow: hidden;
}

// 双层flex布局
.list {
  width: 450%;
  margin-left: 5%;
  @include fj();
  flex-wrap: wrap;
  .items {
    width: 20%;
    @include fj();
    align-items: center;
    margin-top: 0.5%;
    // flex: 2;
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 0.5rem;
      flex: 1;
    }
    .detailedInfo {
      flex: 5;
      margin-left: 1rem;
      p {
        font-weight: bold;
        font-size: 1.2rem;
        span {
          color: $netease-color-five;
          font-weight: initial;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
