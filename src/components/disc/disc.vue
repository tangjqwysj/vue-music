<template>
  <music-list :title='title' :bgImage='bgImage' :songs='songs'></music-list>
</template>

<script>
import MusicList from '../../base/music-list/music-list.vue'
import { getSongList } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import { createSong, isValidMusic, processSongsUrl } from '../../common/js/song'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['getDisc']),
    title() {
      return this.getDisc.dissname
    },
    bgImage() {
      return this.getDisc.imgurl
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.getDisc.dissid) {
        this.$router.back()
      }
      getSongList(this.getDisc.dissid).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then(res => {
            this.songs = res
          })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((v, i) => {
        if (isValidMusic(v)) {
          ret.push(createSong(v))
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