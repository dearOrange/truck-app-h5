import ActionType from './index'

export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const FETCH_USER = 'FETCH_USER'

export const REQUEST_AND_UPDATE_USER = 'REQUEST_AND_UPDATE_USER'

export function updateUser(user = {}): ActionType {
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export function deleteUser(user = {}): ActionType {
  return {
    type: DELETE_USER,
    payload: user
  }
}

export function requestAndUpdateAction(data: any = {}): ActionType {
  return {
    type: REQUEST_AND_UPDATE_USER,
    payload: data
  }
}
