import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getHomeWarOrderListRequest } from '../../../actions'
import { HomeWarOrderList } from '../../../components'

class HomeWarOrders extends Component {
  componentDidMount() {
    if (this.props.warOrder.list.length === 0) {
      this.props.getHomeWarOrderList({ page: 1 })
    }
  }

  render() {
    const { warOrder, navigateTo, getHomeWarOrderList } = this.props
    return (
      <View>
        <HomeWarOrderList
          warOrder={warOrder}
          navigateTo={navigateTo}
          getHomeWarOrderList={getHomeWarOrderList}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    warOrder: state.warOrder.home.warOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeWarOrderList: payload => {
      dispatch(getHomeWarOrderListRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

HomeWarOrders.propTypes = {
  warOrder: PropTypes.object,
  getHomeWarOrderList: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWarOrders)
