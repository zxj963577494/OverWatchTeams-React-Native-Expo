import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  WhiteSpace,
  WingBlank,
  Card,
  Modal,
  List,
  ActivityIndicator
} from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { getMyTeamsRequest, deleteTeamRequest } from '../../../actions'
import { cutstr } from '../../../utils/utils'
import { CardStyle } from '../../../components/CustomStyles'

class AccountTeams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      teamid: ''
    }
    this.onCreateTeam = this.onCreateTeam.bind(this)
  }

  onCreateTeam() {
    if (!_.isEmpty(this.props.user)) {
      if (this.props.teams.length < this.props.user.teamLimit) {
        this.props.navigateTo('AccountTeamsCreate')
      } else {
        Modal.alert(
          '提示',
          '每位用户最多可创建一支战队，若想创建多支战队，请联系管理员963577494@qq.com',
          [{ text: '确定', onPress: () => console.log('success') }]
        )
      }
    } else {
      console.log('登录')
    }
  }

  onRemoveTeam = id => e => {
    Modal.alert('警告', '是否解散该队伍？', [
      { text: '取消', onPress: () => null },
      { text: '确定', onPress: () => this.props.deleteTeam({ teamid: id }) }
    ])
  }

  componentDidMount() {
    if (this.props.teams.length === 0) {
      this.props.getMyTeams()
    }
  }

  render() {
    const { teams, app, navigateTo } = this.props
    return (
      <ScrollView>
        <ActivityIndicator toast text={app.text} animating={app.isFetching} />
        {teams.map((item, index) => (
          <View key={index}>
            <WhiteSpace />
            <Card styles={CardStyle} full>
              <Card.Header
                title={
                  item.englishFullName ||
                  item.chineseFullName ||
                  item.englishName ||
                  item.chineseName
                }
                thumb={item.avatar}
                thumbStyle={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  marginRight: 10
                }}
                extra={
                  <Button
                    onClick={() => {
                      navigateTo('AccountTeamsEdit', {
                        objectId: item.objectId
                      })
                    }}
                    type="ghost"
                    size="small"
                    inline
                  >
                    编辑
                  </Button>
                }
              />
              <Card.Body>
                <List>
                  <List.Item wrap>
                    {cutstr(item.introduction, 200, 0)}
                  </List.Item>
                </List>
              </Card.Body>
              <Card.Footer
                extra={
                  <Button
                    onClick={this.onRemoveTeam(item.objectId)}
                    type="warning"
                    size="small"
                    inline
                  >
                    战队解散
                  </Button>
                }
              />
            </Card>
          </View>
        ))}
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.onCreateTeam} type="primary">
            新 建 战 队
          </Button>
        </WingBlank>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    teams: state.team.account.team.myTeams,
    user: state.user.account.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMyTeams: () => {
      dispatch(getMyTeamsRequest())
    },
    deleteTeam: payload => {
      dispatch(deleteTeamRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountTeams.propTypes = {
  app: PropTypes.object,
  teams: PropTypes.array,
  getMyTeams: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTeams)
