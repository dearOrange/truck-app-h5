import ActionType, { UPDATE_USER, DELETE_USER } from '../actions'

export default function user(user = {}, action: ActionType) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...user,
        ...action.payload
      }
    case DELETE_USER:
      return {
        ...action.payload
      }

    default:
      return user
  }
}
