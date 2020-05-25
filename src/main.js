import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/global.scss'
import 'assets/scss/resetUi.scss'
// 导入lodash库方法
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// 导入toast插件
import ToastObj from 'plugins/toast/index.js'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
const loading = require('./assets/images/loading/loading.gif')

Vue.use(ToastObj)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loading.default,
  attempt: 1
})

// 自动注册基础组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/common',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false
// 计算播放数
Vue.filter('shear', function(origin) {
  var num = 0
  if (origin >= 10000) {
    num = Math.round(origin / 10000) + '万'
    return num
  } else {
    return origin
  }
})

// 转换时间
Vue.filter('format', function(interval) {
  interval = Math.floor(interval)
  const minute = Math.floor(interval / 60)
  const second = Math.floor(interval % 60)
    .toString()
    .padStart(2, '0')
  return `${minute}:${second}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
