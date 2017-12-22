import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Linking
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  Result,
  WhiteSpace,
  Flex,
  Button,
  List,
  WingBlank,
  Toast,
  Modal
} from 'antd-mobile'
import _ from 'lodash'
import {
  postLogoutRequest,
  getUserInfoRequest,
  sendPasswordResetRequest
} from '../../actions'
import config from '../../config'
import { userService } from '../../services/leanclound'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logined: false
    }
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.account.user)) {
      this.setState({
        logined: true
      })
    }
    if (!this.props.account.userinfo.isLoaded) {
      this.props.getUserInfo()
    }
  }

  render() {
    const { logined } = this.state
    const { postLogout, navigateTo, userinfo } = this.props
    return (
      <ScrollView>
        <WhiteSpace />
        <TouchableWithoutFeedback
          onPress={() => {
            if (logined) {
              Toast.info('你好！英雄！', 1)
            } else {
              navigateTo('SignIn')
            }
          }}
        >
          <View>
            <Result
              img={
                <Image
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  source={
                    logined
                      ? { uri: userinfo.avatar }
                      : { uri: config.BASE_DEFAULT_PIC_URL }
                  }
                />
              }
              title={logined ? userinfo.nickname : '登录/注册'}
              message={logined ? userinfo.introduction : '个人介绍'}
            />
          </View>
        </TouchableWithoutFeedback>
        <WhiteSpace />
        <List renderHeader={() => '个人'}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountMime')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>个人简介</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountEmaiVerify')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>验证邮箱</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                Modal.alert('提示', '是否重置密码？', [
                  { text: '取消', onPress: () => null },
                  {
                    text: '确定',
                    onPress: () => {
                      const isVerify = this.props.user.emailVerified
                      if (isVerify) {
                        const email = this.props.user.email
                        this.props.sendPasswordReset({ email: email })
                      } else {
                        Toast.info('邮箱未验证，无法重置密码', 1.5)
                      }
                    }
                  }
                ])
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>重置密码</Text>
            </List.Item>
          </TouchableWithoutFeedback>
        </List>
        <List renderHeader={() => '战队'}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountTeams')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>我的战队</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          {/* <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/inteams')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            所在战队
          </List.Item> */}
        </List>
        <List renderHeader={() => '寻找战队'}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountResumeOrdersCreate')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>发布自荐帖</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountResumeOrders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>我的自荐帖</Text>
            </List.Item>
          </TouchableWithoutFeedback>
        </List>
        <List renderHeader={() => '战队招募'}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountRecruitOrdersCreate')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>发布招募令</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountRecruitOrders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>我的招募令</Text>
            </List.Item>
          </TouchableWithoutFeedback>
        </List>
        <List renderHeader={() => '决战紫禁之巅'}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountWarOrdersCreate')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>发布约战帖</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountWarOrders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>我的约战帖</Text>
            </List.Item>
          </TouchableWithoutFeedback>
        </List>
        <List renderHeader={() => '组队上分'}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountGroupOrdersCreate')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>发布组队帖</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (logined) {
                navigateTo('AccountGroupOrders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            <List.Item arrow="horizontal">
              <Text>我的组队帖</Text>
            </List.Item>
          </TouchableWithoutFeedback>
        </List>
        <List renderHeader={() => '关于'}>
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(
                'https://github.com/zxj963577494/OverWatchTeams'
              ).catch(err => Toast.fail('无法找到该网址', 1))
            }}
          >
            <List.Item arrow="horizontal" extra="OverWatchTeams">
              <Text>项目地址</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL('https://github.com/zxj963577494').catch(err =>
                Toast.fail('无法找到该网址', 1)
              )
            }}
          >
            <List.Item arrow="horizontal" extra="zxj963577494">
              <Text>作者主页</Text>
            </List.Item>
          </TouchableWithoutFeedback>
          <List.Item arrow="horizontal" extra="963577494@qq.com">
            <Text>联系作者</Text>
          </List.Item>
        </List>
        <WhiteSpace />
        {logined ? (
          <WingBlank>
            <Flex>
              <Flex.Item>
                <Button
                  onClick={() => {
                    postLogout()
                  }}
                  type="warning"
                >
                  注 销
                </Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        ) : null}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.user.account,
    userinfo: state.user.account.userinfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfoRequest())
    },
    sendPasswordReset: payload => {
      dispatch(sendPasswordResetRequest(payload))
    },
    postLogout: () => {
      dispatch(postLogoutRequest())
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

Account.propTypes = {
  account: PropTypes.object,
  userinfo: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
