import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getHomeUserInfoListRequest } from '../../../actions'
import { HomeUserInfoList } from '../../../components'

class HomeUserInfos extends Component {
  componentDidMount() {
    if (this.props.userinfo.list.length === 0) {
      this.props.getHomeUserInfoList({ page: 1 })
    }
  }

  render() {
    const { userinfo, navigateTo, getHomeUserInfoList } = this.props
    return (
      <View>
        <HomeUserInfoList
          userinfo={userinfo}
          navigateTo={navigateTo}
          getHomeUserInfoList={getHomeUserInfoList}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userinfo: state.user.home.userinfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeUserInfoList: payload => {
      dispatch(getHomeUserInfoListRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

HomeUserInfos.propTypes = {
  userinfo: PropTypes.object,
  getHomeUserInfoList: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUserInfos)
