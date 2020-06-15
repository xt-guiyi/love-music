# 简易版网易云音乐

## 项目演示

[dome 地址(请使用浏览器手机模式或者在手机上查看)](http://123.56.98.236/#/)
**注意：因为谷歌浏览器更新后导致 better-scroll 插件需要浏览器刷新一次才能正常滚动，手机浏览器无次问**
**后台 api 来自: https://binaryify.github.io/NeteaseCloudMusicApi/#/**

## 作品介绍

在学习 vue 的过程中，秉着实践出真知的道理，因此写了一个简易版模仿安卓手机端的网易云音乐 webapp,来加深对 vue2.0 的理解。目前项目已经达到了我最初的预想实现。

**注意：此作品只是一个播放器案例，受后台 api 因素限制，还有许多不完善的体验以及 bug**

## 运行方式

```
# 克隆到本体文件夹
git clone https://github.com/xt-guiyi/love-music.git
```

```
#打开项目
 cd love-music
```

```
# 安装项目依赖
npm install
```

```
# 开启本地服务运行项目
npm run dev
```

## 使用技术栈

- vue 全家桶(使用 vue-cli)
- axios 库
- ES6 语法
- Scss 预处理器
- animation.css 动画库
- [better-scroll 插件](http://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#)

## 项目布局

```
|- /src
  |- /assets
    |- /font  // 阿里云矢量图字体图标文件
    |- /images // 图片文件夹
    |- /scss
      |- _neteaseGlobalColor.scss // 颜色样式
      |- global.scss // 全局样式
      |- mixin.scss // 混入样式
      |- resetUi.scss // 重置样式
  |- /components // 组件库文件夹
    |- /common // 公用组件
    |- /FindChildComponents // 发现页组件
    |- /header // 头部组件
  |- /plugins // 插件文件夹
    |- /toast // toast 弹框提示插件
  |- /request
    |- /api // ajax请求模块
      |- index.js // 出口
      |- findPageApi.js // 发现页api请求模块
      |- loginApi.js // 登录页api请求模块
      |- mainPageApi.js // 全局api请求模块
      |- playerPageApi.js // 播放器api请求模块
      |- songListPageApi.js // 歌单列表api请求模块
    |- http.js //axios实例封装
  |- /router // 路由
  |- /store // vuex
  |- /utils //公用方法
  |- /views // 页面文件夹
    |- /login // 登录页面
    |- /main // 主页面
    |- home.vue // 开始页
  |- app.vue
  |- main.js
```
