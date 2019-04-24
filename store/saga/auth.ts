import {
  take,
  call,
  takeEvery,
  put,
  select,
  cancelled,
  fork,
  cancel
} from 'redux-saga/effects'
import {
  AUTH_FETCH,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  updateAuthStatus
} from '@store/actions/auth'
import { updateUser, deleteUser } from '@store/actions/user'

import {
  fetchLoginUser,
  loginByAccount,
  loginByPhone,
  logout as doLogout
} from '@api/auth'
import AUTH from '@constant/auth'
import LOGIN_TYPE from '@constant/login'

export function* auth() {
  while (true) {
    let loginTask = yield fork(login)
    yield take(AUTH_LOGOUT)
    yield call(logout)
    yield cancel(loginTask)
  }
}

export function* fetchAuth() {
  yield takeEvery(AUTH_FETCH, fetchUser)
}

function* fetchUser() {
  let status = AUTH.FETCHING
  yield put(updateAuthStatus(status))
  const { success, data } = yield call(fetchLoginUser)
  status = AUTH.FETCHED
  yield put(updateAuthStatus(status))
  if (success) {
    yield put(updateUser(data))
    status |= AUTH.SUCCESS
  } else {
    status |= AUTH.ERROR
  }
  yield put(updateAuthStatus(status | AUTH.FINISH))
}

function* login() {
  try {
    while (true) {
      let {
        payload: { type: loginType, data: loginData }
      } = yield take(AUTH_LOGIN)

      let status = AUTH.LOGINING
      yield put(updateAuthStatus(status))

      let { success } = yield call(
        loginType === LOGIN_TYPE.ACCOUNT ? loginByAccount : loginByPhone,
        loginData
      )
      status = AUTH.LOGINED
      yield put(updateAuthStatus(status))

      if (success) {
        yield call(fetchUser)
        status |= AUTH.SUCCESS
      } else {
        status |= AUTH.ERROR
      }
      yield put(updateAuthStatus(status | AUTH.FINISH))
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateAuthStatus(AUTH.UNLOGIN | AUTH.FINISH))
    }
  }
}

function* logout() {
  let status = AUTH.LOGOUTING
  yield put(updateAuthStatus(status))

  let { success } = yield call(doLogout)
  status = AUTH.LOGOUTED
  if (success) {
    yield put(deleteUser())
    status |= AUTH.SUCCESS
  } else {
    status |= AUTH.ERROR
  }
  yield put(updateAuthStatus(status | AUTH.FINISH))
}
