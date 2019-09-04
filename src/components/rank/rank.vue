<template>
  <div>
    rank
  </div>
</template>

<script>
import { getTopList } from '../../api/rank'
import { ERR_OK } from '../../api/config'
export default {
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    _getTopList() {
      getTopList().then(res => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>