import { TabNavigator, StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/Home'
import GroupOrders from '../screens/Home/GroupOrders'
import RecruitOrders from '../screens/Home/RecruitOrders'
import ResumeOrders from '../screens/Home/ResumeOrders'
import WarOrders from '../screens/Home/WarOrders'
import Teams from '../screens/Home/Teams'
import UserInfos from '../screens/Home/UserInfos'
import Account from '../screens/Account'

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'OverWatchTeams'
    }
  },
  GroupOrders: {
    screen: GroupOrders,
    navigationOptions: {
      headerTitle: '组队上分'
    }
  },
  RecruitOrders: {
    screen: RecruitOrders,
    navigationOptions: {
      headerTitle: '战队招募'
    }
  },
  ResumeOrders: {
    screen: ResumeOrders,
    navigationOptions: {
      headerTitle: '寻找战队'
    }
  },
  WarOrders: {
    screen: WarOrders,
    navigationOptions: {
      headerTitle: '比赛约战'
    }
  },
  Teams: {
    screen: Teams,
    navigationOptions: {
      headerTitle: '战队列表'
    }
  },
  UserInfos: {
    screen: UserInfos,
    navigationOptions: {
      headerTitle: '个人列表'
    }
  }
})

const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      headerTitle: '个人中心'
    }
  }
})

export default TabNavigator(
  {
    Home: {
      screen: HomeStack,
      tabBarLabel: '主页',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    },
    Account: {
      screen: AccountStack,
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-contact' : 'ios-contact-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  {
    initialRouteName: 'Home',
    animationEnabled: true
  }
)
