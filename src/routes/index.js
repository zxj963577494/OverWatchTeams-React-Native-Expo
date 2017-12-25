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
import AccountGroupOrdersEdit from '../screens/Account/GroupOrders/Edit'
import AccountGroupOrdersCreate from '../screens/Account/GroupOrders/Create'
import AccountRecruitOrders from '../screens/Account/RecruitOrders'
import AccountRecruitOrdersEdit from '../screens/Account/RecruitOrders/Edit'
import AccountRecruitOrdersCreate from '../screens/Account/RecruitOrders/Create'
import AccountResumeOrders from '../screens/Account/ResumeOrders'
import AccountResumeOrdersEdit from '../screens/Account/ResumeOrders/Edit'
import AccountResumeOrdersCreate from '../screens/Account/ResumeOrders/Create'
import AccountWarOrders from '../screens/Account/WarOrders'
import AccountWarOrdersEdit from '../screens/Account/WarOrders/Edit'
import AccountWarOrdersCreate from '../screens/Account/WarOrders/Create'
import AccountTeams from '../screens/Account/Teams'
import AccountTeamsEdit from '../screens/Account/Teams/Edit'
import AccountTeamsCreate from '../screens/Account/Teams/Create'

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
    AccountGroupOrdersEdit: {
      screen: AccountGroupOrdersEdit,
      navigationOptions: {
        headerTitle: '编辑组队帖'
      }
    },
    AccountGroupOrdersCreate: {
      screen: AccountGroupOrdersCreate,
      navigationOptions: {
        headerTitle: '新建组队帖'
      }
    },
    AccountRecruitOrders: {
      screen: AccountRecruitOrders,
      navigationOptions: {
        headerTitle: '战队招募'
      }
    },
    AccountRecruitOrdersEdit: {
      screen: AccountRecruitOrdersEdit,
      navigationOptions: {
        headerTitle: '编辑招募令'
      }
    },
    AccountRecruitOrdersCreate: {
      screen: AccountRecruitOrdersCreate,
      navigationOptions: {
        headerTitle: '新建招募令'
      }
    },
    AccountResumeOrders: {
      screen: AccountResumeOrders,
      navigationOptions: {
        headerTitle: '寻找战队'
      }
    },
    AccountResumeOrdersEdit: {
      screen: AccountResumeOrdersEdit,
      navigationOptions: {
        headerTitle: '编辑自荐贴'
      }
    },
    AccountResumeOrdersCreate: {
      screen: AccountResumeOrdersCreate,
      navigationOptions: {
        headerTitle: '创建自荐贴'
      }
    },
    AccountWarOrders: {
      screen: AccountWarOrders,
      navigationOptions: {
        headerTitle: '比赛约战'
      }
    },
    AccountWarOrdersEdit: {
      screen: AccountWarOrdersEdit,
      navigationOptions: {
        headerTitle: '创建约战贴'
      }
    },
    AccountWarOrdersCreate: {
      screen: AccountWarOrdersCreate,
      navigationOptions: {
        headerTitle: '编辑约战贴'
      }
    },
    AccountTeams: {
      screen: AccountTeams,
      navigationOptions: {
        headerTitle: '战队列表'
      }
    },
    AccountTeamsEdit: {
      screen: AccountTeamsEdit,
      navigationOptions: {
        headerTitle: '战队编辑'
      }
    },
    AccountTeamsCreate: {
      screen: AccountTeamsCreate,
      navigationOptions: {
        headerTitle: '创建战队'
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
          size={24}
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
          size={24}
          style={{ color: tintColor }}
        />
      )
    }
  },
  {
    initialRouteName: 'Account',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom'
  }
)

const WelcomeStack = StackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: () => null
    }
  }
})

export default StackNavigator(
  {
    Tab: {
      screen: TabStack
    },
    Welcome: {
      screen: WelcomeStack
    }
  },
  {
    initialRouteName: 'Tab',
    mode: 'screen',
    headerMode: 'none'
  }
)
