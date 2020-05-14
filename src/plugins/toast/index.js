import Vue from 'vue'
import ToastMessage from './Toast.vue'

// 组件构造器
const ToastStructure = Vue.extend(ToastMessage)
// 组件实例
let toast
// 定时器
let timer = null

const toastObj = {
  install() {
    Vue.prototype.$toast = this.useToast
  },

  useToast(options) {
    // 避免重复创建
    if (!toast) {
      // 实例化组件
      toast = new ToastStructure()
      // 挂载
      toast.$mount(document.createElement('div'))
      // 添加
      document.body.appendChild(toast.$el)
    }
    // 避免开启多个定时器
    if (timer) {
      clearTimeout(timer)
      timer = null
      toast.message = ''
    }
    // 判断形参类型
    if (typeof options === 'string') {
      toast.message = options
    } else if (typeof options === 'object') {
      const { message, time } = options
      toast.message = message
      toast.time = time || 3000
    } else {
      return false
    }
    // 显示toast框
    toast.isToast = true
    // 定时消除
    timer = setTimeout(() => {
      toast.isToast = false
      toast.message = ''
      clearTimeout(timer)
      timer = null
    }, toast.time)
  }
}
export default toastObj
