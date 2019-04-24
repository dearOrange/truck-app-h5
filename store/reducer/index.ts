import { combineReducers } from 'redux'

import user from './user'
import auth from './auth'
import depot from './depot'
import my from './my'

export default combineReducers({
  user,
  depot,
  auth,
  my
})
