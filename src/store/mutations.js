import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE] (state, val) {
    state.isCollapse = val
  },
  [types.SET_LOGIN] (state, val) {
    state.islogin = val
  },
  [types.SET_TOKEN] (state, val) {
    state.token = val
  },
  [types.SET_NAME] (state, val) {
    state.name = val
  }
}

export default mutations
