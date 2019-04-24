import { call, takeEvery, put, select } from 'redux-saga/effects'
import {
  TOGGLE_SELECT_ALL,
  updateSelectAll,
  updateBatchAllSelected
} from '@store/actions/my'

import { MY_LIST_SELECTALL } from '@constant/my'

export function* toggleBatchAll() {
  yield takeEvery(TOGGLE_SELECT_ALL, updateMySelectAll)
}

function* updateMySelectAll(action: any) {
  const status: MY_LIST_SELECTALL = action.payload
  yield put(updateSelectAll(status))
  yield put(updateBatchAllSelected(status))
}
