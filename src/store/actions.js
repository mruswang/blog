/**
 * Created by wangsir on 2017/7/10.
 */
import * as types from './mutation-types'

export const setlogin = function ({commit, state}, {str, type}) {
  commit(types.SET_LOGIN, type)
  commit(types.SET_TOKEN, str)
}
