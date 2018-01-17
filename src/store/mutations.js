import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE] (state, val) {
    state.isCollapse = val
  }
}

export default mutations
