<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to='/recommend'>
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to='/singer'>
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link class="tab-item" tag="div" to='/rank'>
      <span class="tab-link">排行</span>
    </router-link>
    <router-link class="tab-item" tag="div" to='/search'>
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.tab
  display: flex
  height: 44px
  align-items: center
  font-size: $font-size-medium
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      color: $color-text-l
      padding-bottom: 5px
    &.router-link-active
      .tab-link
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>