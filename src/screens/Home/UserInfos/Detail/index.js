import React, { Component } from 'react'
import { Text, ScrollView, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WhiteSpace, List, Result, ActivityIndicator } from 'antd-mobile'
import { RANKS, TEAMPOSITIONS } from '../../../../constants'
import { getHomeUserInfoDetailRequest } from '../../../../actions'
import config from '../../../../config'

class HomeUserInfoDetail extends Component {
  componentDidMount() {
    if (!this.props.userinfo) {
      const id = this.props.navigation.state.params.objectId
      this.props.getUserById({ objectId: id })
    }
  }

  render() {
    let { userinfo, current, app } = this.props
    if (userinfo == null && current != null) {
      userinfo = current
    }
    return (
      <ScrollView>
        <ActivityIndicator toast text={app.text} animating={app.isFetching} />
        <WhiteSpace />
        <Result
          img={
            userinfo.avatar ? (
              <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={{ uri: userinfo.avatar }}
              />
            ) : (
              <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={require('../../../../../assets/images/avatarLogo.png')}
              />
            )
          }
          title={userinfo.nickname}
          message={userinfo.introduction}
        />
        <WhiteSpace />
        <List>
          <List.Item
            extra={userinfo.rankscore ? userinfo.rankscore + '分' : '未知'}
          >
            <Text>天梯分</Text>
          </List.Item>
          <List.Item
            extra={
              userinfo.rank
                ? RANKS.filter(x => x.value === userinfo.rank)[0].label
                : '未知'
            }
          >
            <Text>天梯段位</Text>
          </List.Item>
          <List.Item
            extra={
              userinfo.position
                ? TEAMPOSITIONS.filter(x => x.value === userinfo.position)[0]
                    .label
                : '未知'
            }
          >
            <Text>团队定位</Text>
          </List.Item>
        </List>
        <List renderHeader={() => '擅长英雄'}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center'
            }}
          >
            {userinfo.heros ? (
              userinfo.heros.map((item, index) => {
                return (
                  <Image
                    key={index}
                    style={{
                      borderRadius: 30,
                      width: 60,
                      height: 60,
                      margin: 10
                    }}
                    source={{ uri: item.image }}
                  />
                )
              })
            ) : (
              <Image
                style={{
                  borderRadius: 30,
                  width: 60,
                  height: 60,
                  margin: 10
                }}
                source={require('../../../../../assets/images/avatarLogo.png')}
              />
            )}
          </View>
        </List>
        <List renderHeader={() => '个人比赛经历'}>
          <List.Item wrap>
            <Text>{userinfo.match}</Text>
          </List.Item>
        </List>
        <List renderHeader={() => '其他'}>
          <List.Item extra={userinfo.mouse ? userinfo.mouse : '未知'}>
            <Text>鼠标</Text>
          </List.Item>
          <List.Item extra={userinfo.keyboard ? userinfo.keyboard : '未知'}>
            <Text>键盘</Text>
          </List.Item>
          <List.Item extra={userinfo.headphones ? userinfo.headphones : '未知'}>
            <Text>耳机</Text>
          </List.Item>
        </List>
        <WhiteSpace />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    current: state.user.home.userinfo.current,
    userinfo: state.user.home.userinfo.list.filter(
      x => x.objectId === ownProps.navigation.state.params.objectId
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserById: payload => {
      dispatch(getHomeUserInfoDetailRequest(payload))
    }
  }
}

HomeUserInfoDetail.propTypes = {
  app: PropTypes.object,
  current: PropTypes.object,
  user: PropTypes.object,
  getUserById: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUserInfoDetail)
