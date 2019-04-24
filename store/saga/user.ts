import { Toast } from 'antd-mobile'

import { call, take, put } from 'redux-saga/effects'
import { REQUEST_AND_UPDATE_USER, updateUser } from '@store/actions/user'

import { updateUser as updateUserApi, UpdateUserDataType } from '@api/user'

export function* requestAndUpdate() {
  while (true) {
    let { payload } = yield take(REQUEST_AND_UPDATE_USER)
    yield call(request, payload)
  }
}

function* request(data: UpdateUserDataType) {
  let { success, data: updatedData } = yield call(updateUserApi, data)
  if (success) {
    Toast.success('修改成功')
    yield put(updateUser(updatedData))
  } else {
    Toast.fail('修改失败')
  }
  return success
}
