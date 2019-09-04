<template>
  <scroll class="listview" ref="listview" @scroll='scroll' :listenScroll="listenScroll"
          :probeType="probeType">
    <ul>
      <li class="list-group" v-for="group in data" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id"
              @click="selectItem(item)">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop='onShortcutTouchStart'
         @touchmove.stop='onShortcutTouchMove'>
      <ul>
        <li class="item" v-for="(item,index) in shortcutList" :key="index"
            :class="{'current':index===currentIndex}" :data-index='index'>
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '../scroll/scroll.vue'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = [0]
    this.touch = {}
  },
  computed: {
    shortcutList() {
      return this.data.map((v, i) => v.title.slice(0, 1))
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calculateHeight() {
      let list = this.$refs.listGroup
      let height = 0
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        this.listHeight.push(height)
      }
    },
    onShortcutTouchStart(e) {
      this.touch.y1 = e.touches[0].pageY
      this.touch.index = parseInt(e.target.dataset.index)
      this._scrollTo(this.touch.index)
    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      const delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
      let index = this.touch.index + delta
      this._scrollTo(index)
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      this.scrollY = this.$refs.listview.scroll.y
    },
    selectItem(item) {
      this.$emit('select', item)
    }
  },
  watch: {
    data(newVal) {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newVal) {
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        if (-newVal >= this.listHeight[i] && -newVal < this.listHeight[i + 1]) {
          this.currentIndex = i
          this.diff = -newVal - this.listHeight[i + 1]
          return
        }
      }
    },
    diff(newVal) {
      if (-newVal > 0 && -newVal < TITLE_HEIGHT) {
        this.$refs.fixed.style.transform = `translate3d(0,${-newVal - TITLE_HEIGHT}px,0)`
        return
      }
      this.$refs.fixed.style.transform = ''
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.listview
  position: relative
  height: 100%
  width: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
      padding-left: 20px
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        font-size: $font-size-medium
        color: $color-text-l
  .list-shortcut
    position: absolute
    top: 50%
    right: 0
    transform: translateY(-50%)
    width: 20px
    text-align: center
    padding: 20px 0
    border-radius: 10px
    font-family: Helvetica
    background: $color-background-d
    .item
      font-size: $font-size-small
      color: $color-text-l
      padding: 3px
      line-height: 1
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: -1px
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
</style>