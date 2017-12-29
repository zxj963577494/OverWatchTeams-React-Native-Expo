import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'
import {
  TabNavigator,
  StackNavigator,
  NavigationActions
} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

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

import { STATUS_BAR_HEIGHT } from '../constants'

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'OW Teams',
      headerStyle: {
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerTitleStyle: {
        marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        color: 'white'
      }
    }
  },
  HomeGroupOrders: {
    screen: HomeGroupOrders,
    navigationOptions: {
      headerTitle: '组队上分',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
      // headerLeft: (
      //   <TouchableWithoutFeedback onPress={() => NavigationActions.back()}>
      //     <Image
      //       style={{ width: 28, height: 28, marginTop: 20, marginLeft: 10 }}
      //       source={require('../../assets/images/android_arrow_back.png')}
      //     />
      //   </TouchableWithoutFeedback>
      // )
    }
  },
  HomeRecruitOrders: {
    screen: HomeRecruitOrders,
    navigationOptions: {
      headerTitle: '战队招募',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  HomeResumeOrders: {
    screen: HomeResumeOrders,
    navigationOptions: {
      headerTitle: '寻找战队',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  HomeWarOrders: {
    screen: HomeWarOrders,
    navigationOptions: {
      headerTitle: '比赛约战',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  HomeTeams: {
    screen: HomeTeams,
    navigationOptions: {
      headerTitle: '战队列表',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  HomeUserInfos: {
    screen: HomeUserInfos,
    navigationOptions: {
      headerTitle: '个人列表',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  HomeTeamDetail: {
    screen: HomeTeamDetail,
    navigationOptions: {
      headerTitle: '战队详情',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  HomeUserInfoDetail: {
    screen: HomeUserInfoDetail,
    navigationOptions: {
      headerTitle: '个人详情',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: () => null
    }
  }
})

const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      headerTitle: '个人中心',
      headerTintColor: 'white',
      headerStyle: {
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        color: 'white'
      }
    }
  },
  AccountMime: {
    screen: AccountMime,
    navigationOptions: {
      headerTitle: '基本信息',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountEmaiVerify: {
    screen: AccountEmaiVerify,
    navigationOptions: {
      headerTitle: '邮箱验证',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountGroupOrders: {
    screen: AccountGroupOrders,
    navigationOptions: {
      headerTitle: '组队上分',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountGroupOrdersEdit: {
    screen: AccountGroupOrdersEdit,
    navigationOptions: {
      headerTitle: '编辑组队帖',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountGroupOrdersCreate: {
    screen: AccountGroupOrdersCreate,
    navigationOptions: {
      headerTitle: '新建组队帖',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        color: 'white'
      }
    }
  },
  AccountRecruitOrders: {
    screen: AccountRecruitOrders,
    navigationOptions: {
      headerTitle: '战队招募',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountRecruitOrdersEdit: {
    screen: AccountRecruitOrdersEdit,
    headerTintColor: 'white',
    navigationOptions: {
      headerTitle: '编辑招募令',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountRecruitOrdersCreate: {
    screen: AccountRecruitOrdersCreate,
    navigationOptions: {
      headerTitle: '新建招募令',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountResumeOrders: {
    screen: AccountResumeOrders,
    navigationOptions: {
      headerTitle: '寻找战队',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountResumeOrdersEdit: {
    screen: AccountResumeOrdersEdit,
    navigationOptions: {
      headerTitle: '编辑自荐贴',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountResumeOrdersCreate: {
    screen: AccountResumeOrdersCreate,
    navigationOptions: {
      headerTitle: '创建自荐贴',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountWarOrders: {
    screen: AccountWarOrders,
    navigationOptions: {
      headerTitle: '比赛约战',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountWarOrdersEdit: {
    screen: AccountWarOrdersEdit,
    navigationOptions: {
      headerTitle: '创建约战贴',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountWarOrdersCreate: {
    screen: AccountWarOrdersCreate,
    navigationOptions: {
      headerTitle: '编辑约战贴',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountTeams: {
    screen: AccountTeams,
    navigationOptions: {
      headerTitle: '战队列表',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountTeamsEdit: {
    screen: AccountTeamsEdit,
    navigationOptions: {
      headerTitle: '战队编辑',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  AccountTeamsCreate: {
    screen: AccountTeamsCreate,
    navigationOptions: {
      headerTitle: '创建战队',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerTitle: '登录',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: '注册',
      headerTintColor: 'white',
      headerStyle: {
        paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        backgroundColor: '#2196F3'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  }
})

const Tab = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      })
    },
    Account: {
      screen: AccountStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-contact' : 'ios-contact-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom'
  }
)

export default Tab
