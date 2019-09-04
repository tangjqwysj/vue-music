<template>
  <div class="singer">
    <list-view :data='singers' @select='selectSinger'></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ListView from '../../base/listview/listview.vue'
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Singer from '../../common/js/singer'
import types from '../../store/mutationTypes'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    ...mapMutations({
      setSinger: types.SET_SINGER
    }),
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          console.log(this.singers)
        }
      })
    },
    _normalizeSinger(list) {
      let obj = {
        hot: {
          items: [],
          title: HOT_NAME
        }
      }
      list.forEach((v, i) => {
        if (i < HOT_SINGER_LEN)
          obj.hot.items.push(
            new Singer({
              id: v.Fsinger_mid,
              name: v.Fsinger_name
            })
          )
        if (!obj[v.Findex]) {
          obj[v.Findex] = {
            items: [],
            title: v.Findex
          }
        }
        obj[v.Findex].items.push(
          new Singer({
            id: v.Fsinger_mid,
            name: v.Fsinger_name
          })
        )
      })
      let hot = []
      let ret = []
      hot.push(obj.hot)
      for (let k in obj) {
        if (/[a-zA-Z]/.test(obj[k].title)) {
          ret.push(obj[k])
        }
      }
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>