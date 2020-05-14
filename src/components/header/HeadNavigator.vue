<template>
  <!-- 这是通用组件头部导航栏 -->
  <!-- 头部组件 -->
  <header id="headerNav" :style="{ color: color }">
    <!-- 用在路由跳转上 -->
    <div v-if="to !== false">
      <router-link :to="to" tag="div">
        <span class="iconfont back">&#xe766;</span>
      </router-link>
    </div>
    <!-- 用在歌单详情上 -->
    <div v-else>
      <span class="iconfont back" @touchend="back">
        &#xe766;
      </span>
    </div>
    <!-- title名 -->
    <p class="title">{{ name }}</p>
    <!-- 搜索框 -->
    <span v-if="seach" class="iconfont seach">&#xe612;</span>
    <!-- 菜单框 -->
    <span v-if="menu" class="iconfont menu">&#xe6a9;</span>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  inheritAttrs: false,
  props: {
    // 标题
    name: {
      type: [String, Object],
      default: '头部'
    },
    // 文字颜色
    color: {
      type: String,
      default: '#000'
    },
    // 路由返回路径
    to: {
      type: [Object, String, Boolean],
      default: () => {}
    },
    // 搜索图标
    seach: {
      type: Boolean,
      default: false
    },
    // 菜单图标
    menu: {
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
#headerNav {
  height: 4rem;
  width: 90%;
  line-height: 4rem;
  display: flex;
  margin: auto;
}
.back,
.seach,
.menu {
  font-size: 3rem;
}
.back {
  flex: 2;
}
.title {
  flex: 6;
  font-size: 2rem;
  padding-left: 2rem;
}
span {
  text-align: center;
}
.seach {
  flex: 2;
}
.menu {
  flex: 1;
}
</style>
