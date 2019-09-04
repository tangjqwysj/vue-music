<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link class="mine" tag="div" to='/user'>
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.m-header
  position: relative
  height: 44px
  text-align: center
  color: $color-theme
  .icon
    bg-image('logo')
    width: 30px
    height: 32px
    background-size: 30px 32px
    display:inline-block;
    vertical-align top
    margin-top:6px;
    margin-right:9px;
  .text
    display:inline-block;
    vertical-align top
    font-size:$font-size-large
    line-height :44px;
  .mine
    position:absolute
    right:0;
    top:0
    .icon-mine
      display:block;
      padding:12px;
      font-size:20px;
</style>