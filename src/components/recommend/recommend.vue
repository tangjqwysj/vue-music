<template>
  <div class="recommend">
    <scroll class="recommend-content" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if='recommends.length'>
          <div class="slider-content">
            <slider>
              <div v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.dissid" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html='item.creator.name'></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading" v-show="!discList.length">
      <loading></loading>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Scroll from '../../base/scroll/scroll.vue'
import Slider from '../../base/slider/slider.vue'
import Loading from '../../base/loading/loading.vue'
import { getRecommend, getDiscList } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import types from '../../store/mutationTypes'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: types.SET_DISC
    })
  },
  components: {
    Scroll,
    Slider,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.recommend
  position: fixed
  top: 88px
  width: 100%
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      height: 0
      width: 100%
      padding-top: 40%
      overflow: hidden
      .slider-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .recommend-list
      .list-title
        font-size: $font-size-medium
        color: $color-theme
        height: 65px
        line-height: 65px
        text-align: center
      .item
        display: flex
        align-items: center
        padding: 0 20px 20px
        box-sizing: border-box
        .icon
          flex: 0 0 60px
          padding-right: 20px
        .text
          flex: 1
          font-size: $font-size-medium
          line-height: 20px
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
  .loading
    position: absolute
    top: 50%
    width: 100%
    transform: translateY(-50%)
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>