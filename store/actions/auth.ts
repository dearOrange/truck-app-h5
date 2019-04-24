import ActionType from './index'

export const AUTH_FETCH = 'AUTH_FETCH'
export const AUTH_BEFORE_ROUTE = 'AUTH_BEFORE_ROUTE'
export const AUTH_LOGIN = 'AUTH_LOGIN' // 登录
export const AUTH_LOGOUT = 'AUTH_LOGOUT' // 注销
export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS'

export function fetchLoginUserAction(): ActionType {
  return {
    type: AUTH_FETCH
  }
}

export function saveLoginBeforeRouteAction(payload): ActionType {
  return {
    type: AUTH_BEFORE_ROUTE,
    payload
  }
}

export function authLogin(payload): ActionType {
  return {
    type: AUTH_LOGIN,
    payload
  }
}

export function authLogout(payload?: any): ActionType {
  return {
    type: AUTH_LOGOUT,
    payload
  }
}

export function updateAuthStatus(payload): ActionType {
  return {
    type: UPDATE_AUTH_STATUS,
    payload
  }
}
