import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  getAccountWarOrderListRequest,
  deleteWarOrderRequest
} from '../../../actions'
import { AccountWarOrderList } from '../../../components'

class AccountWarOrders extends Component {
  componentDidMount() {
    if (this.props.warOrder.list.length === 0) {
      this.props.getAccountWarOrderList({ page: 1 })
    }
  }

  render() {
    const {
      warOrder,
      navigateTo,
      getAccountWarOrderList,
      deleteWarOrder
    } = this.props
    return (
      <AccountWarOrderList
        warOrder={warOrder}
        navigateTo={navigateTo}
        getAccountWarOrderList={getAccountWarOrderList}
        deleteWarOrder={deleteWarOrder}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    warOrder: state.warOrder.account.warOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountWarOrderList: payload => {
      dispatch(getAccountWarOrderListRequest(payload))
    },
    deleteWarOrder: payload => {
      dispatch(deleteWarOrderRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountWarOrders.propTypes = {
  warOrder: PropTypes.object,
  getAccountWarOrderList: PropTypes.func,
  navigateTo: PropTypes.func,
  deleteWarOrder: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountWarOrders
)
