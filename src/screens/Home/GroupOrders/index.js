import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getHomeGroupOrderListRequest } from '../../../actions'
import { HomeGroupOrderList } from '../../../components'

class HomeGroupOrders extends Component {
  componentDidMount() {
    if (this.props.groupOrder.list.length === 0) {
      this.props.getHomeGroupOrderList({ page: 1 })
    }
  }

  render() {
    const { groupOrder, navigateTo, getHomeGroupOrderList } = this.props
    return (
      <View>
        <HomeGroupOrderList
          groupOrder={groupOrder}
          navigateTo={navigateTo}
          getHomeGroupOrderList={getHomeGroupOrderList}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groupOrder: state.groupOrder.home.groupOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeGroupOrderList: payload => {
      dispatch(getHomeGroupOrderListRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

HomeGroupOrders.propTypes = {
  groupOrder: PropTypes.object,
  getHomeGroupOrderList: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeGroupOrders)
