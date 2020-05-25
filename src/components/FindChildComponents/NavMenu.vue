<template>
  <!-- 导航菜单 -->
  <nav class="navCantainer">
    <div class="content" ref="contentRef">
      <div class="option">
        <p><span></span></p>
        <p>每日推荐</p>
      </div>
      <div class="option">
        <p><span></span></p>
        <p>歌单</p>
      </div>
      <div class="option">
        <p><span></span></p>
        <p>排行榜</p>
      </div>
      <div class="option">
        <p><span></span></p>
        <p>电台</p>
      </div>
      <div class="option">
        <p><span></span></p>
        <p>直播</p>
      </div>
      <div class="option">
        <p><span></span></p>
        <p>唱聊</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixin.scss';

.navCantainer {
  width: 100%;
  height: 8.8rem;
  overflow: hidden;
}
.content {
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  margin-right: 5%;
  @include fj();
}
.option:last-child {
  padding-right: 5%;
}
.option {
  flex: 1;
  text-align: center;
  margin: 2rem 5% 0 5%;

  p:first-child {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: red;
    display: inline-block;
    span {
      width: 3rem;
      height: 3rem;
      background-size: 100%;
      display: inline-block;
      margin: 1rem;
    }
  }
  p:last-child {
    text-align: center;
  }
}
.option:nth-of-type(1) {
  span {
    background-image: url('~assets/images/findPage/log.svg');
  }
}
.option:nth-of-type(2) {
  span {
    background-image: url('~assets/images/findPage/songList.svg');
  }
}
.option:nth-of-type(3) {
  span {
    background-image: url('~assets/images/findPage/rankingList.svg');
  }
}
.option:nth-of-type(4) {
  span {
    background-image: url('~assets/images/findPage/liveBroadcast.svg');
  }
}
.option:nth-of-type(5) {
  span {
    background-image: url('~assets/images/findPage/sing.svg');
  }
}
.option:nth-of-type(6) {
  span {
    background-image: url('~assets/images/findPage/triangle.svg');
  }
}
</style>
