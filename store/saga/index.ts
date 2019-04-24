import { delay } from 'redux-saga'
import { all, call } from 'redux-saga/effects'

import { fetchDepot } from './depot'
import { auth, fetchAuth } from './auth'
import { toggleBatchAll } from './my'
import { requestAndUpdate } from './user'

export default function* rootSaga() {
  yield all([
    call(fetchDepot),
    call(auth),
    call(fetchAuth),
    call(toggleBatchAll),
    call(requestAndUpdate)
  ])
}
