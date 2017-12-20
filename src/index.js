import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import Navigator from './routes'
import configureStore from './store'
import rootSaga from './sagas'

const App = ({ dispatch, nav }) => (
  <Navigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}
  />
)

const mapStateToProps = state => ({
  nav: state.nav
})

const AppWithNavigator = connect(mapStateToProps)(App)

export default () => {
  const store = configureStore({})
  store.runSaga(rootSaga)
  return (
    <Provider store={store}>
      <AppWithNavigator />
    </Provider>
  )
}
