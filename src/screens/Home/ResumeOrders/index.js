import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getHomeResumeOrderListRequest } from '../../../actions'
import { HomeResumeOrderList } from '../../../components'

class HomeResumeOrders extends Component {
  componentDidMount() {
    if (this.props.resumeOrder.list.length === 0) {
      this.props.getHomeResumeOrderList({ page: 1 })
    }
  }

  render() {
    const { resumeOrder, navigateTo, getHomeResumeOrderList } = this.props
    return (
      <HomeResumeOrderList
        resumeOrder={resumeOrder}
        navigateTo={navigateTo}
        getHomeResumeOrderList={getHomeResumeOrderList}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resumeOrder: state.resumeOrder.home.resumeOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeResumeOrderList: payload => {
      dispatch(getHomeResumeOrderListRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

HomeResumeOrders.propTypes = {
  resumeOrder: PropTypes.object,
  getHomeResumeOrderList: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeResumeOrders)
