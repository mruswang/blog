/**
 * Created by wangsir on 2017/7/10.
 */
import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_COLLAPSE, index)
}
