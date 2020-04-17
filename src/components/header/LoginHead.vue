<template>
  <!-- 这是登录组件中所需要用到的头部导航栏 -->
  <!-- 头部组件 -->
  <header id="headerNav">
    <router-link :to="to" tag="div">
      <img width="30px" height="30px" src="~assets/images/LeftArrow.png" />
    </router-link>
    <p class="title">{{ name }}</p>
  </header>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: String,
    to: Object || String
  }
}
</script>

<style lang="scss" scoped>
#headerNav {
  width: 90%;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  margin: auto;
}
img {
  vertical-align: middle;
}
.title {
  margin-left: 1rem;
}
</style>
