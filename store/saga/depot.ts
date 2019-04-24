import { call, takeEvery, put, select } from 'redux-saga/effects'
import { FETCH_DEPORT_DETAIL, saveDetailAction } from '@store/actions/depot'

import { fetchDetail } from '@api/depot'

export function* fetchDepot() {
  yield takeEvery(FETCH_DEPORT_DETAIL, fetchDepotData)
}

function* fetchDepotData(action: any) {
  const id = action.payload.id

  let isExist = yield select(hasDetail, id)

  if (!isExist) {
    const { success, data } = yield call(fetchDetail, id)
    if (success) {
      yield put(saveDetailAction(data, id))
    }
  }
}

function hasDetail(state, id): boolean {
  let detail = state.depot.detail
  return detail && detail[id]
}
