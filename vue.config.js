const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
      .set('request', resolve('src/request'))
  }
}
