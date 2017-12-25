import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  getAccountRecruitOrderListRequest,
  deleteRecruitOrderRequest
} from '../../../actions'
import { AccountRecruitOrderList } from '../../../components'

class AccountRecruitOrders extends Component {
  componentDidMount() {
    if (this.props.recruitOrder.list.length === 0) {
      this.props.getAccountRecruitOrderList({ page: 1 })
    }
  }

  render() {
    const {
      recruitOrder,
      navigateTo,
      getAccountRecruitOrderList,
      deleteRecruitOrder
    } = this.props
    return (
      <AccountRecruitOrderList
        recruitOrder={recruitOrder}
        navigateTo={navigateTo}
        getAccountRecruitOrderList={getAccountRecruitOrderList}
        deleteRecruitOrder={deleteRecruitOrder}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recruitOrder: state.recruitOrder.account.recruitOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountRecruitOrderList: payload => {
      dispatch(getAccountRecruitOrderListRequest(payload))
    },
    deleteRecruitOrder: payload => {
      dispatch(deleteRecruitOrderRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountRecruitOrders.propTypes = {
  recruitOrder: PropTypes.object,
  getAccountRecruitOrderList: PropTypes.func,
  navigateTo: PropTypes.func,
  deleteRecruitOrder: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountRecruitOrders
)
