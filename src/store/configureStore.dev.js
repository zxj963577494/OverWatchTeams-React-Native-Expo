import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import CreateSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'

const config = {
  key: 'root',
  storage,
  debug: true
}

const reducer = persistCombineReducers(config, reducers)

export default function configureStore(initialState) {
  const sagaMiddleware = CreateSagaMiddleware()
  const loggerMiddleware = createLogger()
  const middlewares = [sagaMiddleware, loggerMiddleware]
  const enhancers = compose(applyMiddleware(...middlewares))
  const store = createStore(reducer, initialState, enhancers)
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  const persistor = persistStore(store)
  return { persistor, store }
}
