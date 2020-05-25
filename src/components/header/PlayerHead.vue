<template>
  <!-- 这是通用组件头部导航栏 -->
  <!-- 头部组件 -->
  <header id="headerNav" :style="{ color: color }">
    <span class="iconfont back" @touchend="back">
      &#xe766;
    </span>
    <!-- title名 -->
    <div class="title ">
      <p>{{ name.main }}</p>
      <p>{{ name.vice }}</p>
    </div>
    <!-- 分享框 -->
    <span v-if="share" class="iconfont share">&#xe6cd;</span>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  inheritAttrs: false,
  props: {
    // 标题
    name: {
      type: Object,
      default: () => {}
    },
    // 文字颜色
    color: {
      type: String,
      default: '#000'
    },
    // 分享图标
    share: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#headerNav {
  height: 8%;
  width: 90%;
  display: flex;
  align-items: center;
  margin: auto;
}

.back {
  flex: 1;
  font-size: 3rem;
}
.title {
  flex: 6;
  padding-left: 1rem;
  p:first-child {
    @include mulEllipsis($clamp: 1);
    font-size: 2rem;
  }
  p:last-child {
    font-size: 1.2rem;
    color: $netease-color-five;
  }
}
span {
  text-align: center;
}
.share {
  flex: 1;
  font-size: 2.5rem;
}
</style>
