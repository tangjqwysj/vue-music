<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index"
            :class="{active:index===currentPageIndex}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '../../common/js/dom'

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider || !this.slider.enable) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  },
  activated() {
    this.slider.enable()
    this.currentPageIndex = this.slider.getCurrentPage().pageX
    this.slider.goToPage(this.currentPageIndex, 0, 0)
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated(){
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy(){
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
    refresh() {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    },
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        addClass(this.children[i], 'slider-item')
        this.children[i].style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    _onScrollEnd() {
      this.currentPageIndex = this.slider.getCurrentPage().pageX
      if (this.autoPlay) {
        this._play()
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.slider
  min-height: 1px
  .slider-group
    position relative
    overflow: hidden
    .slider-item
      float: left
      a
        display: block
        width: 100%
        img
          display: block
          width: 100%
  .dots
    position: absolute
    bottom: 12px
    left: 0
    right: 0
    text-align: center
    .dot
      display: inline-block
      width: 8px
      height: 8px
      margin: 0 4px
      border-radius: 50%
      background: $color-text-l
      &.active
        background: $color-text-ll
        width: 20px
        border-radius: 5px
</style>