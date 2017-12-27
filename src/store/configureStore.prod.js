import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import CreateSagaMiddleware, { END } from 'redux-saga'
import reducers from '../reducers'

const config = {
  key: 'root',
  storage
}

const reducer = persistCombineReducers(config, reducers)

export default function configureStore(initialState) {
  const sagaMiddleware = CreateSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  const persistor = persistStore(store)
  return { persistor, store }
}
