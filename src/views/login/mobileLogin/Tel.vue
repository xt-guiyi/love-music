<template>
  <div>
    <!-- 头部区域-->
    <head-nav :name="title" :to="path"> </head-nav>
    <!-- 登录区域 -->
    <div id="content">
      <!-- 提示 -->
      <p id="tips">未登录手机号登录后将自动创建账号</p>
      <!-- 输入手机号 -->
      <div class="center">
        <!-- 下拉框 -->
        <select id="select" disabled>
          <option value="伦敦">英国</option>
          <option value="北京" selected>+86</option>
          <option value="华盛顿">美国</option>
        </select>
        <!-- 手机号 -->
        <input
          id="mobile"
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          v-model="mobileNumber"
          oninput="this.value=this.value.replace(/[^\d]/g,'') "
        />
        <!-- 清除数据 -->
        <span class=" errorIcon iconfont" @click="removeMobile">&#xe613;</span>
      </div>
      <!-- 跳转password.vue -->
      <div class="next" @touchstart="touchStart" @touchend="touchend">
        下一步
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from 'components/header/HeadNavigator.vue'
import { ADD_TEL } from 'store/mutation-type.js'
export default {
  data() {
    return {
      // herder组件标题
      title: '手机号登录',
      // herder组件返回路径
      path: { name: 'Login' },
      // 电话号
      mobileNumber: ''
    }
  },
  methods: {
    // 单击清除input数据
    removeMobile() {
      this.mobileNumber = ''
    },
    // 触摸按下
    touchStart(e) {
      // 兼容性写法获取事件对象
      var event = e || window.event
      var target = event.target || event.srcElement
      target.style.opacity = '0.5'
    },
    // 触摸松开
    touchend(e) {
      // 兼容性写法获取事件对象
      var event = e || window.event
      var target = event.target || event.srcElement
      target.style.opacity = '1'

      // 验证手机号格式
      const i = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/)
      // 如果通过
      if (i.test(this.mobileNumber)) {
        // 提交到vueX状态中
        this.$store.commit(ADD_TEL, this.mobileNumber)
        // 跳转路由
        this.$router.push({ name: 'MobileLoginPass' })
      } else {
        // 否则输出提示
        const message = '请输入正确的手机号'
        this.$toast(message)
      }
    }
  },
  components: {
    HeadNav
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#content {
  width: 90%;
  margin: auto;
  #tips {
    height: 6rem;
    line-height: 6rem;
    font-size: 1.2rem;
    color: darkgrey;
  }
  .center {
    height: 2rem;
    @include fj();
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    #select {
      flex: 1;
      font-size: 1.6rem;
      background-color: rgb(255, 255, 255);
      border: none;
    }
    #mobile {
      flex: 7;
      font-size: 1.3rem;
      border: none;
      margin-left: 1rem;
      outline: none;
    }
    .errorIcon {
      flex: 1;
      font-size: 2rem;
      color: rgb(200, 201, 207);
    }
  }
  .next {
    font-size: 2.4rem;
    text-align: center;
    color: $netease-color-one;
    background-color: $netease-background-Color;
    border-radius: 20rem;
    margin-top: 3rem;
  }
}
</style>
