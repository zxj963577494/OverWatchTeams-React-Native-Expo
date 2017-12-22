import React from 'react'
import { StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/Home'
import HomeGroupOrders from '../screens/Home/GroupOrders'
import HomeRecruitOrders from '../screens/Home/RecruitOrders'
import HomeResumeOrders from '../screens/Home/ResumeOrders'
import HomeWarOrders from '../screens/Home/WarOrders'
import HomeTeams from '../screens/Home/Teams'
import HomeUserInfos from '../screens/Home/UserInfos'
import HomeTeamDetail from '../screens/Home/Teams/Detail'
import HomeUserInfoDetail from '../screens/Home/UserInfos/Detail'

import Account from '../screens/Account'
import AccountMime from '../screens/Account/Mime'
import AccountEmaiVerify from '../screens/Account/EmaiVerify'
import AccountGroupOrders from '../screens/Account/GroupOrders'
import AccountRecruitOrders from '../screens/Account/RecruitOrders'
import AccountResumeOrders from '../screens/Account/ResumeOrders'
import AccountWarOrders from '../screens/Account/WarOrders'
import AccountTeams from '../screens/Account/Teams'

import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Welcome from '../screens/Welcome'

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'OverWatchTeams'
      }
    },
    HomeGroupOrders: {
      screen: HomeGroupOrders,
      navigationOptions: {
        headerTitle: '组队上分'
      }
    },
    HomeRecruitOrders: {
      screen: HomeRecruitOrders,
      navigationOptions: {
        headerTitle: '战队招募'
      }
    },
    HomeResumeOrders: {
      screen: HomeResumeOrders,
      navigationOptions: {
        headerTitle: '寻找战队'
      }
    },
    HomeWarOrders: {
      screen: HomeWarOrders,
      navigationOptions: {
        headerTitle: '比赛约战'
      }
    },
    HomeTeams: {
      screen: HomeTeams,
      navigationOptions: {
        headerTitle: '战队列表'
      }
    },
    HomeUserInfos: {
      screen: HomeUserInfos,
      navigationOptions: {
        headerTitle: '个人列表'
      }
    },
    HomeTeamDetail: {
      screen: HomeTeamDetail,
      navigationOptions: {
        headerTitle: '战队详情'
      }
    },
    HomeUserInfoDetail: {
      screen: HomeUserInfoDetail,
      navigationOptions: {
        headerTitle: '个人详情'
      }
    }
  },
  {
    headerBackTitle: null,
    headerTruncatedBackTitle: null,
    headerMode: 'screen'
  }
)

const AccountStack = StackNavigator(
  {
    Account: {
      screen: Account,
      navigationOptions: {
        headerTitle: '个人中心'
      }
    },
    AccountMime: {
      screen: AccountMime,
      navigationOptions: {
        headerTitle: '基本信息'
      }
    },
    AccountEmaiVerify: {
      screen: AccountEmaiVerify,
      navigationOptions: {
        headerTitle: '邮箱验证'
      }
    },
    AccountGroupOrders: {
      screen: AccountGroupOrders,
      navigationOptions: {
        headerTitle: '组队上分'
      }
    },
    AccountRecruitOrders: {
      screen: AccountRecruitOrders,
      navigationOptions: {
        headerTitle: '战队招募'
      }
    },
    AccountResumeOrders: {
      screen: AccountResumeOrders,
      navigationOptions: {
        headerTitle: '寻找战队'
      }
    },
    AccountWarOrders: {
      screen: AccountWarOrders,
      navigationOptions: {
        headerTitle: '比赛约战'
      }
    },
    AccountTeams: {
      screen: AccountTeams,
      navigationOptions: {
        headerTitle: '战队列表'
      }
    }
  },
  {
    headerBackTitle: null,
    headerTruncatedBackTitle: null,
    headerMode: 'screen'
  }
)

const TabStack = TabNavigator(
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
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom'
  }
)

export default StackNavigator(
  {
    Tab: {
      screen: TabStack
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerTitle: '登录'
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerTitle: '注册'
      }
    },
    Welcome: {
      screen: Welcome
    }
  },
  {
    initialRouteName: 'Tab',
    mode: 'modal',
    headerMode: 'none',
    headerBackTitle: null,
    headerTruncatedBackTitle: null
  }
)
