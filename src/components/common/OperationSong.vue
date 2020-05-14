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
    <div class="playKey" @touchend="play">
      <span :style="imageStyle"></span>
    </div>
    <div class="playMenu"><span></span></div>
    <!-- <div v-if="player">
      <audio ref="musciRef" :src="getMusic.url" autoplay hidden></audio>
    </div> -->
  </div>
</template>

<script>
import { SHOW_PLAYER, PLAY_PAUSE } from 'store/mutation-type.js'

export default {
  name: 'PlaylistSong',
  data() {
    return {
      isplay: false, // 是否播放,
      imageStyle: {}
    }
  },

  props: {},
  created() {},
  updated() {},
  methods: {
    // 显示播放器
    showPlayer() {
      this.$store.commit(SHOW_PLAYER, true)
    },
    // 播放暂替
    play() {
      this.$store.commit(PLAY_PAUSE, this.isplay)
      if (!this.isplay) {
        const img = require('../../assets/images/operationSongPage/playlist.svg')
        this.imageStyle = {
          backgroundImage: 'url(' + img + ')'
        }
      } else {
        const img = require('../../assets/images/operationSongPage/suspend.svg')
        this.imageStyle = {
          backgroundImage: 'url(' + img + ')'
        }
      }
      this.isplay = !this.isplay
    }
  },
  computed: {
    initSong() {
      return this.$store.state.initSong
    }
  }
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
    span {
      background-size: 80%;
      background-image: url('~assets/images/operationSongPage/suspend.svg');
      border-radius: 50%;
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
