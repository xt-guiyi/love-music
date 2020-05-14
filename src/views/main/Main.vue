<template>
  <div id="cantainer">
    <!-- 主体页 -->
    <div>
      <!-- 头部导航栏 -->
      <main-head></main-head>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 隐藏页 -->
    <transition>
      <song-list-details
        class="side"
        v-if="this.$store.state.initSongSheet.isShow"
      ></song-list-details>
    </transition>
    <!-- 播放歌曲操作组件 -->
    <operation-song
      class="fix"
      v-if="this.$store.state.isShowOperationSong"
    ></operation-song>
    <!-- audio播放器 -->
    <transition>
      <player v-show="this.$store.state.isShowPlayer"></player>
    </transition>
  </div>
</template>

<script>
import MainHead from 'components/header/MainHead.vue'

export default {
  data() {
    return {}
  },
  mounted() {},
  components: {
    MainHead
  }
}
</script>

<style lang="scss" scoped>
#cantainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.side {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.fix {
  position: fixed;
  bottom: 0;
  z-index: 998;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
