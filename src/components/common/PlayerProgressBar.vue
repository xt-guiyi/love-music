<template>
  <div class="ProgressWrapper">
    <span>{{ currentTime | format }}</span>
    <div class="ProgressBarWrapper">
      <!-- 进度条 -->
      <div class="ProgressBar" ref="progressBarRef" @click="progressClick">
        <!-- 线条 -->
        <div class="barInner">
          <div class="progress" ref="progressRef"></div>
        </div>
        <!-- 圆点 -->
        <div
          class="progressBtnWrapper"
          ref="progressBtnRef"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend.prevent="progressTouchEnd"
        >
          <div class="progressBtn"></div>
        </div>
      </div>
    </div>
    <span>{{ duration | format }}</span>
  </div>
</template>

<script>
import { PERCENT_TIME } from 'store/mutation-type.js'
export default {
  data() {
    return {
      touch: {
        initiated: false, // 初始化
        startX: '', // 触摸开始位置
        left: '' // 当前进度条位置
      }
    }
  },
  props: {
    // 当前时间
    currentTime: {
      type: Number,
      default: 0
    },
    // 总时间
    duration: {
      type: Number,
      default: 0
    },
    // 当前时间/总时间
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    progressTouchStart(e) {
      // console.log(e.changedTouches[0])
      this.touch = {
        initiated: true,
        startX: e.changedTouches[0].pageX,
        left: this.$refs.progressRef.clientWidth
      }
    },

    progressTouchMove(e) {
      const barWidth =
        this.$refs.progressBarRef.clientWidth -
        this.$refs.progressBtnRef.children[0].clientWidth
      const deltaX = e.changedTouches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(
        barWidth,
        Math.max(0, this.touch.left + deltaX)
      )
      this._offset(offsetWidth)
    },

    progressTouchEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },

    // 点击进度条
    progressClick(e) {
      const rect = this.$refs.progressBarRef.getBoundingClientRect()
      // console.log(this.$refs.progressBarRef.getBoundingClientRect())
      const offsetWidth = e.pageX - rect.left
      // 得出距离后，黄色进度条位置、小圆圈位置
      this._offset(offsetWidth)
      // 告诉外部拖动的百分比percent
      this._triggerPercent()
    },

    // 计算：黄色进度条宽度 小圆圈的位置
    _offset(offsetWidth) {
      // 黄色进度条宽度
      this.$refs.progressRef.style.width = `${offsetWidth}px`
      // 小圆圈的位置
      this.$refs.progressBtnRef.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
    },

    // 告知外部百分比
    _triggerPercent() {
      const barWidth =
        this.$refs.progressBarRef.clientWidth -
        this.$refs.progressBtnRef.children[0].clientWidth
      const percent = this.$refs.progressRef.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    // 监听当前播放时间
    percent(val) {
      if (val >= 0 && !this.touch.initiated) {
        const barWidth =
          this.$refs.progressBarRef.clientWidth -
          this.$refs.progressBtnRef.children[0].clientWidth
        const offsetWidth = val * barWidth
        this._offset(offsetWidth)
        this.$store.commit(PERCENT_TIME, val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ProgressWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

span {
  color: #fff;
  font-size: 1.2rem;
  flex: 1;
}

span:first-child {
  text-align: left;
}
span:last-child {
  text-align: right;
}
.ProgressBarWrapper {
  height: 100%;
  flex: 8;
  .ProgressBar {
    height: 100%;
    position: relative;
    .barInner {
      position: relative;
      top: calc(50% - 0.25rem);
      height: 0.5rem;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: #fff;
        // width: 30px;
      }
    }
    .progressBtnWrapper {
      position: absolute;
      top: 0;
      left: -0.8rem;
      height: 100%;
      width: 3rem;
      .progressBtn {
        width: 1.4rem;
        height: 1.4rem;
        position: relative;
        top: calc(50% - 0.7rem);
        left: 7px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #fff;
      }
    }
  }
}
</style>
