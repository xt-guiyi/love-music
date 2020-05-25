<template>
  <div id="operationSong">
    <div class="songImage" @touchend="showPlayer">
      <span
        :style="{
          backgroundImage: 'url(' + initSong.picUrl + ')'
        }"
      ></span>
    </div>
    <div class="songName">
      <p>{{ initSong.name }}</p>
      <p>{{ initSong.arName }}</p>
    </div>
    <div class="playKey" @touchend.prevent="play">
      <div class="circle">
        <svg
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            class="progressBackground"
          ></circle>
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashOffset"
            class="progressBar"
          ></circle>
        </svg>
        <span
          :class="{ playImage: this.$store.state.playObj.playPause }"
        ></span>
      </div>
    </div>
    <div class="playMenu"><span></span></div>
  </div>
</template>

<script>
import { SHOW_PLAYER, PLAY_PAUSE, JUKEBOX_STOP } from 'store/mutation-type.js'

export default {
  name: 'PlaylistSong',
  data() {
    return {
      dashArray: Math.PI * 90 // 圆的周长
    }
  },

  props: {},
  created() {},
  updated() {},
  mounted() {},
  methods: {
    // 显示播放器
    showPlayer() {
      this.$store.commit(SHOW_PLAYER, true)
    },
    // 播放暂替
    play() {
      this.$store.commit(JUKEBOX_STOP, !this.$store.state.playObj.jukeboxStop)
      this.$store.commit(PLAY_PAUSE, !this.$store.state.playObj.playPause)
    }
  },
  computed: {
    initSong() {
      return this.$store.state.initSong
    },
    dashOffset() {
      return (1 - this.$store.state.playObj.percentTime) * this.dashArray
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixin.scss';

#operationSong {
  width: 100%;
  height: 5rem;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  div {
    text-align: center;
  }
  span {
    height: 3.5rem;
    width: 3.5rem;
    vertical-align: middle;
    display: inline-block;
    background-size: 100%;
    // background-color: #eee;
    background-position: center;
    background-repeat: no-repeat;
  }
  .songImage {
    flex: 1.5;
    span {
      border-radius: 50%;
    }
  }
  .songName {
    flex: 7;
    line-height: normal;
    text-align: left;
    p {
      width: 80%;
      @include mulEllipsis($clamp: 1);
    }
    p:first-child {
      font-size: 1.6rem;
    }
    p:last-child {
      font-size: 1.2rem;
      color: #808080;
    }
  }
  .playKey {
    flex: 1.5;
    .circle {
      position: relative;
      height: 3.5rem;
      width: 3.5rem;
      margin: 0 auto;
      // text-align: center;
      svg {
        .progressBackground {
          stroke: rgba(114, 114, 114, 0.5);
          stroke-width: 0.4rem;
        }
        .progressBar {
          transform-origin: center;
          transform: rotate(-90deg);
          stroke: #ee4242;
          stroke-width: 0.4rem;
        }
      }

      span {
        background-size: 80%;
        background-image: url('~assets/images/operationSongPage/playlist.svg');
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .playImage {
        background-image: url('~assets/images/operationSongPage/suspend.svg');
      }
    }
  }
  .playMenu {
    flex: 1.5;
    span {
      background-image: url('~assets/images/operationSongPage/playMenu.svg');
      background-size: 80%;
    }
  }
}
</style>
