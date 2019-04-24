import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import reducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export function initializeStore(initialState = {}) {
  let store = createStore(
    reducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  sagaMiddleware.run(rootSaga)

  return store
}
