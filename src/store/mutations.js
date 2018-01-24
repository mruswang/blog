import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE] (state, val) {
    state.isCollapse = val
  },
  [types.SET_LOGIN] (state, val) {
    state.islogin = val
  }
}

export default mutations
