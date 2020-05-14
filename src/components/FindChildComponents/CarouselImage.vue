<template>
  <!-- 轮播图 -->
  <div id="carousel">
    <!-- 图片集 -->
    <ul
      class="pictureCollection"
      ref="pictureCollectionRef"
      @touchstart="stopTime"
      @touchend="upTime"
      @touchmove="moveImg"
      :style="{
        transform: swiperStyle.transform,
        transition: swiperStyle.transition,
        height: height
      }"
    ></ul>
    <!-- 指示器 -->
    <ul class="carouselIndicator" :v-if="isIndicator">
      <li
        v-for="(item, dotIndex) in list.length"
        :key="dotIndex"
        class="carouselIndicatorItem"
      >
        <span
          :class="[dotIndex == index - 1 ? 'is-active-item' : '', 'dot']"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CarouselImage',
  data() {
    return {
      index: 1, // 图片索引
      imgLength: 0, // 图片实际个数
      timer: null, // 定时器
      swiperStyle: {}, // 控制轮播的样式
      start: {
        x: 0
      },
      isMove: false, // 是否移动了
      time: 300
    }
  },
  props: {
    // 高度
    height: {
      type: String,
      default: '10rem'
    },
    // 轮播时间
    interval: {
      type: Number,
      default: 2000
    },
    // 轮播过渡时间
    transitionTime: {
      type: Number,
      default: 1000
    },
    // 是否显示指示器
    isIndicator: {
      type: Boolean,
      default: true
    },
    // 图片和链接数据(地址)
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 展现图片
    showImage() {
      var list = this.list
      var pictureCollection = this.$refs.pictureCollectionRef
      // 设置图片栏总宽度(因为还要增加两张图片所以加2)
      pictureCollection.style.width =
        this.mobileWidth * (list.length + 2) + 'px'
      // 遍历创建li元素
      list.forEach(item => {
        var tagert = document.createElement('li')
        // 模板
        var template = `<a href="${item.url ? item.url : '#'}">
        <img src="${item.pic}"  style="height:${this.height}"/></a>`
        // 添加
        tagert.className = 'picture'
        tagert.innerHTML = template
        pictureCollection.appendChild(tagert)
      })
      // 克隆第一张和最后一张图片
      var firstImg = pictureCollection.firstChild.cloneNode(true)
      var lastImg = pictureCollection.lastChild.cloneNode(true)
      // 分别在尾首添加(这样第一张图片其实就是原来的最后一张图片,反之亦然,共11张)
      pictureCollection.appendChild(firstImg)
      pictureCollection.insertBefore(lastImg, pictureCollection.firstChild)
      // 默认展示第二张图片
      this.swiperStyle = {
        transform: `translateX(-${this.mobileWidth}px)`
      }
    },

    // 自动轮播
    autoCarousel() {
      // 实际图片个数
      this.imgLength = this.list.length + 2
      // 设置定时
      this.autoplay(this.imgLength)
    },
    // 定时器
    autoplay(length) {
      this.timer = setInterval(() => {
        this.index++
        // 当即将轮播到最后一张图片时或则第一张图片时
        if (this.index === length - 1) {
          // 清除定时器
          clearInterval(this.timer)
          // 处理过渡情况
          this.criticality(1)
          return this.autoplay(length)
        }
        this.handleMove()
      }, this.interval)
    },
    criticality(boundary, transitionTime) {
      // 继续移动到最后一张或者第一张
      this.handleMove(transitionTime)
      this.index = boundary
      // 同时迅速把图片切换到第二张或者第10张,因为切换的两张图片一模一样所以不会被发现
      setTimeout(() => {
        this.swiperStyle = {
          transform: 'translateX(-' + this.mobileWidth * boundary + 'px)',
          transition: 'all 0s'
        }
      }, transitionTime || this.transitionTime)
    },
    // 处理移动动画
    handleMove(transitionTime) {
      // 移动距离
      var movex = this.mobileWidth * this.index
      // 保存到对象中
      if (transitionTime) {
        this.swiperStyle = {
          transform: 'translateX(-' + movex + 'px)',
          transition: 'transform ' + transitionTime + 'ms'
        }
      } else {
        this.swiperStyle = {
          transform: 'translateX(-' + movex + 'px)',
          transition: 'transform ' + this.transitionTime + 'ms'
        }
      }
    },
    // 触摸不动则停止定时器
    stopTime(e) {
      e.stopPropagation()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      // 保存触摸点位置

      this.start.x = e.changedTouches[0].pageX
    },
    // 触摸离开
    upTime(e) {
      if (this.isMove) {
        e.stopPropagation()
        // console.log(e.changedTouches[0].pageX - this.start.x)
        var distanceX = e.changedTouches[0].pageX - this.start.x
        if (distanceX < 0) {
          this.index++
          if (this.index === this.list.length + 1) {
            this.criticality(1, this.time)
          } else {
            this.handleMove(this.time)
          }
        } else {
          this.index--
          if (this.index === 0) {
            console.log(this.index)
            this.criticality(9, this.time)
          } else {
            this.handleMove(this.time)
          }
        }
      }
      this.isMove = false
      this.autoplay(this.imgLength)
    },
    // 触摸移动则让图片跟着动
    moveImg(e) {
      e.stopPropagation()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      // console.log(e)
      var distanceX = e.changedTouches[0].pageX - this.start.x
      this.swiperStyle = {
        transform: `translateX(${-this.index * this.mobileWidth +
          distanceX}px)`,
        transition: 'transform 0s'
      }
      this.isMove = true
    }
  },
  watch: {
    // 监听父组件传值是否取得
    list(newVal, oldVal) {
      if (newVal) {
        this.showImage()
        this.autoCarousel()
      }
    }
  },
  computed: {
    mobileWidth() {
      return document.body.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/mixin.scss';

#carousel {
  width: 100%;
  margin: auto;
  overflow: hidden;
  position: relative;
}
.pictureCollection {
  // width: 900%;
  list-style: none;
  @include fj();
}
// 指示器样式
.carouselIndicator {
  width: 36%;
  position: absolute;
  bottom: 5%;
  left: 32%;
  display: flex;
}
.carouselIndicatorItem {
  flex: 1;
  list-style: none;
  .dot {
    width: 0.6rem;
    height: 0.6rem;
    margin: auto;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 0.3rem 0 0.3rem;
    display: inline-block;
  }
}
.is-active-item {
  background-color: red !important;
}
</style>
