<template>
  <music-list :title="title" :bgImage='bgImage' :songs='songs'></music-list>
</template>

<script>
import MusicList from '../../base/music-list/music-list.vue'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import { isValidMusic, createSong, processSongsUrl } from '../../common/js/song'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSingerDetail()
  },
  computed: {
    ...mapGetters(['getSinger']),
    title() {
      return this.getSinger.name
    },
    bgImage() {
      return this.getSinger.avatar
    }
  },
  methods: {
    _getSingerDetail() {
      if (!this.getSinger.id) {
        this.$router.back()
        return
      }
      getSingerDetail(this.getSinger.id).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then(res => {
            this.songs = res
          })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((v, i) => {
        let { musicData } = v
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped></style>