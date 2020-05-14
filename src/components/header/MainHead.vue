<template>
  <header id="headNav">
    <span class="iconfont nav">&#xe614;</span>
    <main>
      <router-link :to="{ name: 'My' }" tag="p" class="routerSytel">
        我的
      </router-link>
      <router-link :to="{ name: 'Find' }" tag="p" class="routerSytel">
        发现
      </router-link>
      <router-link :to="{ name: 'My' }" tag="p" class="routerSytel">
        云村
      </router-link>
      <router-link :to="{ name: 'My' }" tag="p" class="routerSytel">
        视频
      </router-link>
    </main>
    <span class="iconfont seach">&#xe612;</span>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import 'assets/scss/_neteaseGlobalColor.scss';
@import 'assets/scss/mixin.scss';
#headNav {
  width: 90%;
  height: 4rem;
  line-height: 4rem;
  margin: auto;
  @include fj(space-between);
  .nav {
    font-size: 2.4rem;
  }
  .seach {
    font-size: 2rem;
  }
  main {
    width: 60%;
    @include fj();
    .routerSytel {
      font-size: 1.8rem;
      color: $netease-color-five;
      text-align: center;
      flex: 1;
    }
  }
}
.router-link-active {
  font-size: 2rem !important;
  font-weight: bold;
  color: $netease-color-six !important;
}
</style>
