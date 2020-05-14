<template>
  <div id="loginPage">
    <!-- 网易云logo -->
    <div id="title"></div>
    <!-- 登录功能 -->
    <div id="content" @touchstart="touchStart" @touchend="touchEnd">
      <!-- 手机号登录 -->
      <div class="cellphone mar-top" ref="cell">手机号登录</div>
      <!-- 不登录，立即体验 -->
      <div class="experience mar-top" ref="experi">立即体验</div>
      <!-- 其他登录方式 -->
      <div id="loginBar">
        <!-- 微信,QQ,微博,网易邮箱 -->
        <span class="login1"></span>
        <span class="login2"></span>
        <span class="login3"></span>
        <span class="login4"></span>
      </div>
    </div>
    <!-- 同意政策 -->
    <div class="side" ref="showAnimateRef">
      <input id="color-input" type="checkbox" ref="checkboxRef" />
      <label for="color-input"></label>
      <i>
        <span style="color:#FF776D">同意</span>
        《用户协议》《隐私政策》《儿童隐私政策》
      </i>
    </div>
  </div>
</template>

<script>
import { animateCSS } from 'utils/utilsFunction.js'
export default {
  methods: {
    // 绑定事件委托
    // 按下触发
    touchStart(e) {
      // 兼容性写法获取事件对象
      var event = e || window.event
      var target = event.target || event.srcElement
      // 判断是否是指定元素被点击(避免容器被点击)
      // console.log(target.id)
      if (target.id === 'content' || target.id === 'loginBar') {
        return false
      }
      target.style.opacity = '0.5'
    },
    // 鼠标松开触发
    touchEnd(e) {
      // 兼容性写法获取事件对象
      var event = e || window.event
      var target = event.target || event.srcElement
      target.style.opacity = '1'
      // 判断是否勾选用户政策
      if (!this.$refs.checkboxRef.checked) {
        // 调用toast组件提示
        const message = '请先勾选同意 《用户协议》《隐私政策》《儿童隐私政策》'
        this.$toast(message)
        // 调用animated动画提示
        animateCSS(this, 'showAnimateRef', 'shake')
        return false
      } else {
        if (target.matches('.cellphone')) {
          this.$router.push({ name: 'MobileLoginTel' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/neteaseGlobalColor.scss';
@import '~assets/scss/mixin.scss';

.cellphone,
.experience {
  height: 3.6rem;
  line-height: 3.6rem;
  font-size: 1.6rem;
  border-radius: 20rem;
  text-align: center;
}

.login1,
.login2,
.login3,
.login4 {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  border-radius: 50%;
  background-origin: content-box;
  border: 1px solid $netease-color-four;
  padding: 0.8rem;
  margin: auto auto;
}

// 向上距离15px
.mar-top {
  margin-top: 1.5rem;
}

#loginPage {
  width: 100%;
  height: 100%;
  background-color: $netease-background-Color;
  position: absolute;
  display: flex;
  justify-content: center;
}

#title {
  width: 10rem;
  height: 10rem;
  @include bis('~assets/images/logo2.png');
  background-size: 10rem;
  position: absolute;
  top: 10%;
}

#content {
  width: 80%;
  display: inline-block;
  position: absolute;
  bottom: 5%;
  cursor: pointer;
  .cellphone {
    color: $netease-color-two;
    background-color: $netease-color-one;
  }
  .experience {
    color: $netease-color-three;
    background-color: $netease-background-Color;
    border: 1px solid $netease-color-four;
  }
  #loginBar {
    height: 7.2rem;
    @include fj(center);
    .login1 {
      @include bis('~assets/images/weixin.png');
    }
    .login2 {
      @include bis('~assets/images/qq.png');
    }
    .login3 {
      @include bis('~assets/images/weibo.png');
    }
    .login4 {
      @include bis('~assets/images/email.png');
    }
  }
}
.side {
  font-size: 0.8rem;
  color: $netease-color-one;
  text-align: center;
  position: absolute;
  bottom: 2.5%;
  label {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    cursor: pointer;
    position: absolute;
    top: 0.2rem;
    left: 0;
    background: $netease-background-Color;
    border: 1px solid #ff776d;
    border-radius: 0.2rem;
  }
  input {
    vertical-align: middle;
    visibility: hidden;
  }
  #color-input:checked + label::before {
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: block;
    content: '\2713';
    color: #ff776d;
  }
}
</style>
