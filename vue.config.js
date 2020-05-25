const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  publicPath: '/neteasecloudmusic/',
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
      .set('request', resolve('src/request'))
      .set('plugins', resolve('src/plugins'))

    //cdn设置
    config.set('externals', {
      'better-scroll': 'BScroll',
      vue: 'Vue',
      'vue-router': 'VueRouter'
    })

    // 图片转码
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))

    // 发布模式压缩选项
    if (process.env.NODE_ENV === 'production') {
      // 去除console
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.warnings = false
        args[0].terserOptions.compress.drop_console = true
        args[0].terserOptions.compress.drop_debugger = true
        args[0].parallel = true
        return args
      })
      //设置标题
      config.plugin('html').tap(args => {
        args[0].title = '爱音乐'
        return args
      })
    }
  }
}
