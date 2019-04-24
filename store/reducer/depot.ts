import ActionType, { SAVE_DEPOT_DETAIL } from '../actions'
import { combineReducers } from 'redux'

function detail(detail: any = {}, action: ActionType) {
  switch (action.type) {
    case SAVE_DEPOT_DETAIL:
      return {
        [action.payload.id]: action.payload.data
      }
    default:
      return detail
  }
}

export default combineReducers({
  detail
})
