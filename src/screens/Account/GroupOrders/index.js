import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  getAccountGroupOrderListRequest,
  deleteGroupOrderRequest
} from '../../../actions'
import { AccountGroupOrderList } from '../../../components'

class AccountGroupOrders extends Component {
  componentDidMount() {
    if (this.props.groupOrder.list.length === 0) {
      this.props.getAccountGroupOrderList({ page: 1 })
    }
  }

  render() {
    const {
      groupOrder,
      navigateTo,
      getAccountGroupOrderList,
      deleteGroupOrder
    } = this.props
    return (
      <AccountGroupOrderList
        groupOrder={groupOrder}
        navigateTo={navigateTo}
        getAccountGroupOrderList={getAccountGroupOrderList}
        deleteGroupOrder={deleteGroupOrder}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groupOrder: state.groupOrder.account.groupOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountGroupOrderList: payload => {
      dispatch(getAccountGroupOrderListRequest(payload))
    },
    deleteGroupOrder: payload => {
      dispatch(deleteGroupOrderRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountGroupOrders.propTypes = {
  groupOrder: PropTypes.object,
  getAccountGroupOrderList: PropTypes.func,
  navigateTo: PropTypes.func,
  deleteGroupOrder: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountGroupOrders
)
