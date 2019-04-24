import { combineReducers } from 'redux'

import ActionType, { AUTH_BEFORE_ROUTE, UPDATE_AUTH_STATUS } from '../actions'
import AUTH from '@constant/auth'

function status(status: any = AUTH.UNLOGIN, action: ActionType) {
  switch (action.type) {
    case UPDATE_AUTH_STATUS:
      return action.payload
    default:
      return status
  }
}

function before(before: any = null, action: ActionType) {
  switch (action.type) {
    case AUTH_BEFORE_ROUTE:
      return action.payload
    default:
      return before
  }
}

export default combineReducers({
  status,
  before
})
