<template>
  <div>
    <!-- 头部区域 -->
    <login-head :name="title" :to="path"> </login-head>
    <!-- 登录区域 -->
    <div id="content">
      <!-- 输入密码 -->
      <div class="center">
        <input
          id="mobile"
          type="password"
          placeholder="请输入密码"
          v-model="password"
        />
        <span class="forgetPass">忘记密码？</span>
      </div>
      <!-- 点击登录 -->
      <div class="next" @touchstart="touchStart" @touchend="touchend">登录</div>
    </div>
  </div>
</template>

<script>
import LoginHead from 'components/header/LoginHead'
import { loginApi } from 'request/api/index'
import { SAVE_TOKEN, SAVE_ACCOUNT, SAVE_PROFILE } from 'store/mutation-type.js'

export default {
  data() {
    return {
      // head组件属性
      title: '手机号登录',
      path: { name: 'MobileLoginTel' },
      // 密码
      password: ''
    }
  },
  methods: {
    // 触摸按下
    touchStart(e) {
      // 兼容性写法获取事件对象
      var event = e || window.event
      var target = event.target || event.srcElement
      target.style.opacity = '0.5'
    },
    // 触摸松开
    async touchend(e) {
      // 兼容性写法获取事件对象
      var event = e || window.event
      var target = event.target || event.srcElement
      target.style.opacity = '1'
      // 创建登录数据对象
      const loginData = {}
      loginData.phone = this.$store.state.loginTel
      loginData.password = this.password
      // 发送登录请求
      var { data } = await loginApi.mobileLogin(loginData)
      console.log(data)
      // 判断登录是否成功
      if (data === undefined) {
        // 请求失败直接return
        return false
      } else if (data.code === 502 || data.code === 400) {
        this.$toast('用户名或密码错误')
      } else {
        // 登录成功保存token和账号信息
        this.$store.commit(SAVE_TOKEN, data.token)
        this.$store.commit(SAVE_ACCOUNT, data.account)
        this.$store.commit(SAVE_PROFILE, data.profile)
        console.log(this.$store.state)
        this.$router.push({ name: 'Find' })
      }
    }
  },
  components: {
    LoginHead
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

#content {
  width: 90%;
  margin: auto;

  .center {
    height: 2rem;
    @include fj();
    margin-top: 3rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    #mobile {
      flex: 8;
      border: none;
      outline: none;
    }
    .forgetPass {
      font-size: 0.8rem;
      line-height: 3rem;
      text-align: center;
      color: rgb(41, 130, 214);
      flex: 2;
      border-bottom: none;
      border: none;
    }
  }
  .next {
    font-size: 2.4rem;
    text-align: center;
    color: $netease--color-one;
    background-color: $netease-background-Color;
    border-radius: 20rem;
    margin-top: 3rem;
  }
}
</style>
