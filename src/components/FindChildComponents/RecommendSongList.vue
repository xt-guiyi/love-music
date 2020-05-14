<template>
  <!-- 推荐歌单 -->
  <section id="songListBar">
    <div class="bar">
      <h5>推荐歌单</h5>
      <div class="discribe clearfix">
        <p>为你精挑细选</p>
        <span>查看更多</span>
      </div>
    </div>
    <div class="songList">
      <div class="content">
        <div
          class="options"
          v-for="(item, index) in songListData"
          :key="index"
          @touchmove="slipDetection"
          @touchend="getSongListDatelis(item)"
        >
          <div class="square">
            <div
              class="imgUrl"
              :style="{ backgroundImage: 'url(' + item.picUrl + ')' }"
            ></div>
            <!-- <img :src="item.picUrl" /> -->
            <div class="playNumber">
              <span></span><i>{{ item.playCount | shear }}</i>
            </div>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { SAVE_SONG_SHEET } from 'store/mutation-type.js'

export default {
  name: 'RecommendSongList',
  data() {
    return {
      isMove: false // 是否滑动
    }
  },
  props: {
    songListData: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    // 检测滑动
    slipDetection() {
      this.isMove = true
    },
    // 跳转歌单详情页
    getSongListDatelis(item) {
      // 若没有滑动才进行跳转
      if (!this.isMove) {
        this.$store.commit(SAVE_SONG_SHEET, {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          isShow: true
        })
      }
      this.isMove = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#songListBar {
  width: 100%;
  .bar {
    width: 90%;
    margin: 2rem auto 0.8rem;
    h5 {
      font-weight: initial;
      color: $netease-color-five;
    }
    .discribe {
      height: 2rem;
      width: 100%;
      letter-spacing: 0.1rem;
      p {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.4rem;
        font-weight: bold;
        float: left;
      }
      span {
        height: 1.6rem;
        line-height: 1.6rem;
        padding: 0.1rem 0.6rem;
        border: 1px solid $netease-color-five;
        border-radius: 20rem;
        float: right;
      }
    }
  }
}

.songList {
  width: 100%;
  height: 12.8rem;
  overflow: hidden;
  .content {
    height: 13.5rem;
    padding-left: 5%;
    overflow-x: scroll;
    @include fj();
    .options:first-child {
      margin-left: 0;
    }
    .options:last-child {
      padding-right: 5%;
    }
    .options {
      flex: 1;
      margin-left: 2.5%;
      .square {
        width: 10rem;
        height: 10rem;
        position: relative;
        .imgUrl {
          width: 100%;
          height: 100%;
          background-size: 100%;
          border-radius: 0.5rem;
        }
        .playNumber {
          position: absolute;
          top: 0.2rem;
          right: 1rem;
          span {
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
            @include bis('~assets/images/findPage/triangle.svg');
            vertical-align: middle;
          }
          i {
            color: #fff;
            margin-left: 0.1rem;
          }
        }
      }
      p {
        width: 10rem;
        height: 2.8rem;
        display: -webkit-box; /* autoprefixer: off */
        -webkit-box-orient: vertical; /* autoprefixer: on */
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
