import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { BackHandler, Platform, StatusBar, View } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { Toast } from 'antd-mobile'
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

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.routes[0].index === 0) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp()
        return true
      }
      this.lastBackPressed = Date.now()
      Toast.show('再按一次退出应用')
      return true
    } else {
      dispatch(NavigationActions.back())
      return true
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  render() {
    const { dispatch, nav } = this.props
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => {
            this.setState({ isReady: true })
          }}
          onError={console.warn}
        />
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Navigator
          navigation={addNavigationHelpers({
            dispatch,
            state: nav
          })}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

const AppWithNavigator = connect(mapStateToProps)(App)

export default () => {
  const { persistor, store } = configureStore({})

  store.runSaga(rootSaga)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppWithNavigator />
      </PersistGate>
    </Provider>
  )
}
