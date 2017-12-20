import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import CreateSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const sagaMiddleware = CreateSagaMiddleware()
  const loggerMiddleware = createLogger()
  const middlewares = [sagaMiddleware, loggerMiddleware]
  const enhancers = compose(
    applyMiddleware(...middlewares)
  )
  const store = createStore(
    rootReducer,
    initialState,
    enhancers
  )
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
