import { NavigationActions } from 'react-navigation'
import AppNavigator from '../routes'

const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
)

const navReducer = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

export { navReducer }
