<template>
  <div>
    <!-- 头部导航栏 -->
    <!-- 导航栏背景层 -->
    <div
      class="head"
      ref="headRef"
      :style="{
        backgroundImage: 'url(' + backgroundImage + ')'
      }"
    >
      <!-- 遮罩层 -->
      <div class="inner"></div>
    </div>
    <!-- 导航栏上层 -->
    <div class="headTop">
      <head-nav
        :name="headData.name"
        :to="headData.to"
        :color="headData.color"
        :menu="headData.menu"
        :seach="headData.seach"
        @back="hideSongDetails"
      ></head-nav>
    </div>
    <!-- 主体内容区域 -->
    <div class="main">
      <!-- 滚动框 -->
      <scroll-view
        class="wrap"
        :probeType="scrollViewData.probeType"
        :bounce="scrollViewData.bounce"
        :listenScroll="scrollViewData.listenScroll"
        :touchEndAfter="scrollViewData.touchEndAfter"
        :data="songSheetData"
        @scroll="handleScroll"
      >
        <div class="content">
          <!-- 歌单信息 -->
          <div
            class="songListInfo"
            :style="{
              backgroundImage: 'url(' + backgroundImage + ')'
            }"
          >
            <!-- 遮罩层 -->
            <div class="inner"></div>
            <!-- 顶层 -->
            <div class="top">
              <!-- 歌单名 -->
              <p class="name">{{ initSongSheetData.name }}</p>
              <!-- 歌单创建者和描述 -->
              <div class="songListDes">
                <p>
                  <span
                    :style="{
                      backgroundImage:
                        'url(' + songSheetData.creator.avatarUrl + ')'
                    }"
                  ></span
                  >{{ songSheetData.creator.nickname }}
                </p>
                <p>{{ songSheetData.description }}</p>
              </div>
              <!-- 歌单操作菜单 -->
              <div class="songListOperation">
                <p>
                  <img src="~assets/images/songDetailsPage/comment.svg" />
                  <span>{{ songSheetData.commentCount }}</span>
                </p>
                <p>
                  <img src="~assets/images/songDetailsPage/share.svg" />
                  <span>{{ songSheetData.shareCount }}</span>
                </p>
                <p>
                  <img src="~assets/images/songDetailsPage/download.svg" />
                  <span>下载</span>
                </p>
                <p>
                  <img
                    src="~assets/images/songDetailsPage/multipleSelection.svg"
                  />
                  <span>多选</span>
                </p>
              </div>
            </div>
          </div>
          <div class="songListContent" ref="songListContentRef">
            <!--歌曲操作列 -->
            <div class="songOperationCol">
              <p><span></span></p>
              <p><i>播放全部</i>(共{{ songSheetData.trackCount }}首)</p>
              <p>
                <span>+</span>收藏({{ songSheetData.subscribedCount | shear }})
              </p>
            </div>
            <!-- 歌曲列表 -->
            <div class="songList">
              <ul>
                <li
                  v-for="(item, index) in songSheetData.tracks"
                  :key="index"
                  @touchmove="slipDetection"
                  @touchend="playSong(item)"
                >
                  <i class="SerialNumber">{{ index + 1 }}</i>
                  <div class="songInfo">
                    <p>{{ item.name }}</p>
                    <p>{{ item.ar[0].name }}-{{ item.al.name }}</p>
                  </div>
                  <span class="iconfont ">&#xe6a9;</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 订阅用户 -->
          <div class="footer">
            <p>
              <span
                v-for="(item, index) in this.songSheetData.subscribers"
                :key="index"
                :style="{
                  backgroundImage: 'url(' + item.avatarUrl + ')'
                }"
              ></span>
            </p>
            <p>{{ songSheetData.subscribedCount }}人收藏</p>
          </div>
        </div>
      </scroll-view>
    </div>
    <!-- 播放歌曲操作组件 -->
    <operation-song
      class="fix"
      v-if="this.$store.state.isShowOperationSong"
    ></operation-song>
  </div>
</template>

<script>
import HeadNav from 'components/header/HeadNavigator.vue'
import { songListPageApi } from 'request/api/index.js'
import { getRandomArrayElements } from 'utils/utilsFunction.js'
import {
  PLAYLIST,
  SAVE_SONG,
  SHOW_OPERATION_SONG,
  SHOW_PLAYER
} from 'store/mutation-type.js'
export default {
  name: 'SongListDetails',
  data() {
    return {
      // 头部组件属性对象
      headData: {
        name: '歌单',
        to: false,
        color: '#fff',
        seach: true,
        menu: true
      },
      // 滚动组件属性对象
      scrollViewData: {
        probeType: 3,
        bounce: false,
        listenScroll: true,
        touchEndAfter: true
      },
      // 歌单详情页数据
      songSheetData: {
        creator: {}
      },
      // 歌曲列表距离顶部的距离
      songListContentTop: 0,
      // 头部导航栏的高度
      headNavHeight: 0,
      isMove: false // 是否滑动
    }
  },
  components: {
    HeadNav
  },
  created() {
    this.getSongListDetails()
  },
  mounted() {
    setTimeout(() => {
      this.songListContentTop = this.$refs.songListContentRef.getBoundingClientRect().top
      this.headNavHeight = this.$refs.headRef.clientHeight
      // console.log(this.headNavHeight)
    }, 800)
  },
  methods: {
    // 隐藏歌单
    hideSongDetails() {
      this.$store.state.initSongSheet.isShow = false
    },
    // 获取歌单详情数据
    async getSongListDetails() {
      const { data } = await songListPageApi.playlistDetails(
        this.initSongSheetData.id
      )
      if (data.code === 200) {
        console.log(data)
        this.songSheetData = data.playlist
        // 保存播放列表
        this.$store.commit(PLAYLIST, data.privileges)
        // 处理数据
        // 从订阅人数组中随机抽五人
        this.songSheetData.subscribers = getRandomArrayElements(
          this.songSheetData.subscribers,
          5
        )
      }
    },
    // 处理移动透明
    handleScroll(pos) {
      // 让顶部透明度之间来回变化
      // console.log(pos)
      var dis = this.$refs.songListContentRef.getBoundingClientRect().top
      this.$refs.headRef.style.opacity = 1 - dis / this.songListContentTop
      // 这一步是为了确保万无一失，保证消失不见哈哈，不然会很丑
      if (dis === this.songListContentTop) {
        this.$refs.headRef.style.opacity = 0
      }
    },
    // 检测滑动
    slipDetection() {
      this.isMove = true
    },
    // 播放歌曲
    playSong(item) {
      if (!this.isMove) {
        // 保存歌曲信息到vuex
        this.$store.commit(SAVE_SONG, {
          id: item.id,
          name: item.name,
          arName: item.ar[0].name,
          picUrl: item.al.picUrl
        })
        if (
          this.$store.state.isShowOperationSong === false &&
          this.$store.state.isShowPlayer === false
        ) {
          this.$store.commit(SHOW_OPERATION_SONG, true)
          this.$store.commit(SHOW_PLAYER, true)
        }
      }
      this.isMove = false
    }
  },
  computed: {
    backgroundImage() {
      return (
        this.songSheetData.backgroundCoverUrl || this.initSongSheetData.picUrl
      )
    },
    initSongSheetData() {
      return this.$store.state.initSongSheet
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

// 头部样式
.headTop {
  width: 100%;
  @include pz($position: fixed, $zIndex: 999);
  padding-top: 1.2rem;
}
.head {
  width: 100%;
  height: 4rem;
  @include pz($position: fixed, $top: 0, $zIndex: 997);
  padding-top: 1.2rem;
  background-position: center calc(50% - 10rem);
  background-size: 100%;
  opacity: 0;
  .inner {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    @include pz($position: absolute, $top: 0, $zIndex: 998);
  }
}

// 主体样式
.main {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: center;
}

.wrap {
  height: 100%;
}

.content {
  width: 100%;
  @include pz($zIndex: 996);
  .songListInfo {
    padding: 5rem 0;
    background-position: center;
    background-size: 100%;
    @include pz();
    .inner {
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      @include pz($position: absolute, $top: 0);
    }
    .top {
      @include pz();
      .name {
        width: 90%;
        height: 6rem;
        font-size: 2rem;
        color: $netease-color-one;
        margin: 1rem auto 0;
        @include mulEllipsis;
      }
      .songListDes {
        width: 50%;
        margin: 0 0 0 5%;
        p {
          font-size: 1.5rem;
          padding-right: 2rem;
          margin: 1rem 0;
          color: #cbbfb3;
          @include pz();
          &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 2rem;
            height: 100%;
            background-image: url('~assets/images/songDetailsPage/rightArrow.svg');
            background-size: 2rem 100%;
          }
        }
        p:first-child {
          height: 3rem;
          display: inline-block;
          @include singleEllipsis;
          span {
            width: 3rem;
            height: 3rem;
            display: inline-block;
            border-radius: 50%;
            margin-right: 0.5rem;
            background-size: 3rem;
            vertical-align: middle;
          }
        }
        p:last-child {
          height: 4rem;
          width: auto;
          @include mulEllipsis;
        }
      }

      .songListOperation {
        width: 90%;
        margin: auto;
        @include fj();
        p {
          height: 6rem;
          flex: 1;
          text-align: center;
          img {
            width: 3rem;
            height: 3rem;
          }
          span {
            font-size: 1.5rem;
            display: block;
            color: #cbbfb3;
          }
        }
      }
    }
  }

  .songListContent {
    width: 100%;
    min-height: 60rem;
    background-color: #fff;
    border-radius: 2rem 2rem 0 0;
    @include pz($top: -5rem, $zIndex: 1);
    .songOperationCol {
      @include pz();
      height: 6rem;
      background-color: #fff;
      border-radius: 2rem 2rem 0 0;
      @include fj();
      p:nth-of-type(1) {
        flex: 2;
        @include fj($type: center);
        align-items: center;
        span {
          height: 3rem;
          width: 3rem;
          display: inline-block;
          @include bis($url: '~assets/images/songDetailsPage/play.svg');
        }
      }
      p:nth-of-type(2) {
        flex: 6;
        font-size: 1.8rem;
        font-weight: 600;
        @include fj();
        align-items: center;
        i {
          margin-right: 0.5rem;
        }
      }
      p:nth-of-type(3) {
        flex: 4;
        font-size: 1.4rem;
        font-weight: initial;
        color: #fff;
        background-color: $netease-color-two;
        border-radius: 20rem;
        margin: 1rem;
        @include fj();
        align-items: center;
        span {
          margin: 0 1rem;
        }
      }
    }

    .songList {
      width: 100%;
      height: 100%;
      ul {
        list-style: none;
        li {
          height: 6rem;
          @include fj();
          align-items: center;
          .SerialNumber {
            flex: 2;
            font-size: 1.8rem;
            text-align: center;
            color: $netease-color-five;
          }
          .songInfo {
            flex: 8;
            p {
              width: 80%;
            }
            p:first-child {
              font-size: 1.8rem;
              @include mulEllipsis($clamp: 1);
            }
            p:last-child {
              font-size: 1rem;
              color: $netease-color-five;
            }
          }
          span {
            flex: 2;
            font-size: 1.8rem;
            text-align: center;
          }
        }
      }
    }
  }
}
.footer {
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  background-color: #fff;
  @include pz($position: absolute, $bottom: 0);
  @include fj();
  p:first-child {
    flex: 7;
    span {
      height: 3rem;
      width: 3rem;
      background-size: 100%;
      border-radius: 50%;
      margin: 1rem 0.5rem;
      display: inline-block;
    }
  }
  p:last-child {
    flex: 3;
    font-size: 1.8rem;
    text-align: center;
    color: $netease-color-five;
  }
}
.fix {
  @include pz($position: fixed, $bottom: 0, $zIndex: 999);
}
</style>
