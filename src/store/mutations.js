import types from './mutationTypes'

export default {
  [types.SET_SINGER](state, singer) {
    return (state.singer = singer)
  },
  [types.SET_DISC](state, discList) {
    return (state.disc = discList)
  }
}
