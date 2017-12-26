import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import Navigator from './routes'
import configureStore from './store'
import rootSaga from './sagas'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

class App extends Component {
  state = {
    isReady: false
  }
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../assets/images/home.png'),
      require('../assets/images/home_icon.png'),
      require('../assets/images/avatar_logo.png')
    ])
    const fontAssets = cacheFonts([Ionicons.font])
    await Promise.all([...imageAssets, ...fontAssets])
  }

  render() {
    const { dispatch, nav } = this.props
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav
        })}
      />
    )
  }
}

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
