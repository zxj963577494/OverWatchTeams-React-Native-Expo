import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  getAccountResumeOrderListRequest,
  deleteResumeOrderRequest
} from '../../../actions'
import { AccountResumeOrderList } from '../../../components'

class AccountResumeOrders extends Component {
  componentDidMount() {
    if (this.props.resumeOrder.list.length === 0) {
      this.props.getAccountResumeOrderList({ page: 1 })
    }
  }

  render() {
    const {
      resumeOrder,
      navigateTo,
      getAccountResumeOrderList,
      deleteResumeOrder
    } = this.props
    return (
      <AccountResumeOrderList
        resumeOrder={resumeOrder}
        navigateTo={navigateTo}
        getAccountResumeOrderList={getAccountResumeOrderList}
        deleteResumeOrder={deleteResumeOrder}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resumeOrder: state.resumeOrder.account.resumeOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountResumeOrderList: payload => {
      dispatch(getAccountResumeOrderListRequest(payload))
    },
    deleteResumeOrder: payload => {
      dispatch(deleteResumeOrderRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountResumeOrders.propTypes = {
  resumeOrder: PropTypes.object,
  getAccountResumeOrderList: PropTypes.func,
  navigateTo: PropTypes.func,
  deleteResumeOrder: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountResumeOrders
)
