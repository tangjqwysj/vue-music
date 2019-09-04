<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song,index) in songs" :key="song.id" @click="selectItem(song,index)">
        <div class="rank">
          <span></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{desc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    desc(song) {
      return `${song.name}·${song.album}`
    },
    selectItem(song, index) {
      this.$emit('select', song, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.song-list
  .item
    height: 64px
    font-size: $font-size-medium
    box-sizing: border-box
    display: flex
    align-items: center
    .content
      flex: 1
      line-height: 20px
      .name
        color: $color-text
        no-wrap()
      .desc
        color: $color-text-d
        no-wrap()
        margin-top: 6px
</style>