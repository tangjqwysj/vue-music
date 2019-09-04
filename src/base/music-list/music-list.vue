<template>
  <div class="musicList">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper" ref="playBtn">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref='layer'></div>
    <scroll class="list" ref="list" :listenScroll="listenScroll" :probeType="probeType"
            @scroll='scroll'>
      <div class="song-list-wrapper">
        <song-list :songs='songs' @select='selectItem'></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../scroll/scroll.vue'
import SongList from '../song-list/song-list.vue'

const RESERVED_HEIGHT = 40

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  mounted() {
    this.bgImageHeight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = this.bgImageHeight + 'px'
    this.minTranslateY = -this.bgImageHeight + RESERVED_HEIGHT
  },
  methods: {
    back() {
      this.$router.back()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectItem(song, index) {
      
    }
  },
  watch: {
    scrollY(newVal) {
      let transleteY = Math.max(this.minTranslateY, newVal)
      let scale = 1
      let zIndex = 0
      let precent = transleteY / this.bgImageHeight
      if (newVal > 0) {
        scale = 1 + precent
        zIndex = 10
      }
      this.$refs.layer.style.transform = `translate3d(0,${transleteY}px,0)`
      if (newVal < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = RESERVED_HEIGHT + 'px'
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.transform = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  components: {
    Scroll,
    SongList
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.musicList
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 100
  background: $color-background
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position: absolute
    top: 0
    left: 10%
    width: 80%
    margin: 0 auto
    line-height: 40px
    z-index: 40
    no-wrap()
    font-size: $font-size-large
    color: $color-text
    text-align: center
  .bg-image
    position: relative
    height: 0
    width: 100%
    padding-top: 70%
    background-size: cover
    transform-origin: top
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.3)
    .play-wrapper
      position: absolute
      bottom: 20px
      width: 100%
      z-index: 50
      .play
        text-align: center
        border: 1px solid $color-theme
        border-radius: 100px
        width: 135px
        margin: 0 auto
        padding: 7px 0
        color: $color-theme
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: center
        .icon-play
          font-size: $font-size-medium-x
          margin-right: 6px
        .text
          font-size: $font-size-small
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: absolute
    width: 100%
    top: 0
    bottom: 0
    background: $color-background
    .song-list-wrapper
      padding: 20px 30px
</style>