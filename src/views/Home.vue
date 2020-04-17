<template>
  <div id="home" ref="home">
    <!-- 标题 -->
    <div id="title">音乐的力量</div>
    <!-- 版权信息 -->
    <div id="copyright" ref="copyrightInfo">
      <div><span class="logo"></span><i>网易云音乐</i></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.showAnimation()
  },
  methods: {
    // 显示动画效果
    showAnimation() {
      // 渐入版权信息
      setTimeout(() => {
        this.$refs.copyrightInfo.style.cssText =
          ' opacity: 1; transition: all 1s ease-in; '
        // 渐出home页面
        // setTimeout(() => {
        //   this.$refs.home.style.cssText =
        //     ' opacity: 0.5; transition: all 0.5s ease-in; '
        // }, 2000)
      }, 0)
      // 跳转登录页
      setTimeout(() => {
        this.$router.push({ name: 'Login' })
      }, 2500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#home {
  width: 100%;
  height: 100%;
  color: $netease--color-one;
  background-color: $netease-background-Color;
  position: relative;
  @include fj(center);
}

#title {
  font-size: 3.4rem;
  position: absolute;
  top: 25%;
}

#copyright {
  position: absolute;
  bottom: 5%;
  opacity: 0;
  .logo {
    width: 2.4rem;
    height: 2.4rem;
    display: inline-block;
    @include bis('../assets/images/logo1.jpg');
    border-radius: 50%;
    vertical-align: middle; //图片文字垂直居中
  }
  i {
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }
}
</style>
