import React, { Component } from 'react'
import { Text, ScrollView, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Card, WhiteSpace, ActivityIndicator } from 'antd-mobile'
import { setNavBar, getHomeTeamDetailRequest } from '../../../../actions'
import { RANKS } from '../../../../constants'

class HomeTeamDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGetMember: false
    }
    this.getTeamById = this.getTeamById.bind(this)
  }

  componentDidMount() {
    if (!this.props.team) {
      const id = this.props.navigation.state.params.objectId
      this.props.getTeamById({ objectId: id })
    }
  }

  getTeamById() {
    this.setState({
      isGetMember: true
    })
    const id = this.props.navigation.state.params.objectId
    this.props.getTeamById({ objectId: id })
  }

  render() {
    let { team, current, app } = this.props
    if ((team == null && current != null) || this.state.isGetMember) {
      team = current
    }
    if (!team) {
      return null
    }
    return (
      <ScrollView>
        <ActivityIndicator toast text={app.text} animating={app.isFetching} />
        <WhiteSpace />
        <Card full>
          <Card.Header
            title={
              team.englishFullName ||
              team.chineseFullName ||
              team.englishName ||
              team.chineseName
            }
            thumb={
              <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={{
                  uri: team.avatar
                }}
              />
            }
          />
          <Card.Body>
            <List>
              <List.Item extra={team.englishName}>
                <Text>英文简称</Text>
              </List.Item>
              <List.Item extra={team.englishFullName}>
                <Text>英文全称</Text>
              </List.Item>
              <List.Item extra={team.chineseName}>
                <Text>中文简称</Text>
              </List.Item>
              <List.Item extra={team.chineseFullName}>
                <Text>中文全称</Text>
              </List.Item>
              <List.Item extra={team.contact}>
                <Text>联系方式</Text>
              </List.Item>
              <List.Item extra={team.createCity}>
                <Text>所在地点</Text>
              </List.Item>
              <List.Item extra={team.isRecruit ? '是' : '否'}>
                <Text>是否正在招募</Text>
              </List.Item>
              <List.Item
                extra={
                  team.rank
                    ? RANKS.filter(x => x.value === team.rank)[0].label
                    : '未知'
                }
              >
                <Text>平均段位</Text>
              </List.Item>
            </List>
            <List renderHeader={() => '战队介绍'}>
              <List.Item wrap>
                <Text>{team.introduction}</Text>
              </List.Item>
            </List>
            <List renderHeader={() => '比赛经历'}>
              <List.Item wrap>
                <Text>{team.match}</Text>
              </List.Item>
            </List>
            <List renderHeader={() => '主要荣耀'}>
              <List.Item wrap>
                <Text>{team.honor}</Text>
              </List.Item>
            </List>
          </Card.Body>
        </Card>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    current: state.team.home.team.current,
    team: state.team.home.team.list.filter(
      x => x.objectId === ownProps.navigation.state.params.objectId
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTeamById: payload => {
      dispatch(getHomeTeamDetailRequest(payload))
    }
  }
}

HomeTeamDetail.propTypes = {
  app: PropTypes.object,
  current: PropTypes.object,
  team: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeamDetail)
