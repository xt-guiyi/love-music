<template>
  <div id="toast" v-show="isToast" ref="toastRef">{{ message }}</div>
</template>

<script>
import { animateCSS } from 'utils/utilsFunction.js'

export default {
  name: 'toast',
  data() {
    return {
      message: '',
      time: 3000,
      isToast: false
    }
  },
  beforeUpdate() {
    animateCSS(this, 'toastRef', 'fadeInUp')
  }
}
</script>

<style lang="scss" scoped>
#toast {
  // height: 2.6rem;
  width: 25rem;
  font-size: 1.2rem;
  text-align: center;
  background-color: #eee;
  padding: 0.8rem;
  border-radius: 1rem;
  position: fixed;
  left: calc(50% - 13.3rem);
  bottom: 15%;
}
</style>
