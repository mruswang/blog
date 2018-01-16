import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE] (state, singer) {
    state.singer = singer
  }
}

export default mutations
