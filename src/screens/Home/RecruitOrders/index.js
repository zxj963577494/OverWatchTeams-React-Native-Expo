import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getHomeRecruitOrderListRequest } from '../../../actions'
import { HomeRecruitOrderList } from '../../../components'

class HomeRecruitOrders extends Component {
  componentDidMount() {
    if (this.props.recruitOrder.list.length === 0) {
      this.props.getHomeRecruitOrderList({ page: 1 })
    }
  }

  render() {
    const { recruitOrder, navigateTo, getHomeRecruitOrderList } = this.props
    return (
      <View>
        <HomeRecruitOrderList
          recruitOrder={recruitOrder}
          navigateTo={navigateTo}
          getHomeRecruitOrderList={getHomeRecruitOrderList}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recruitOrder: state.recruitOrder.home.recruitOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeRecruitOrderList: payload => {
      dispatch(getHomeRecruitOrderListRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

HomeRecruitOrders.propTypes = {
  recruitOrder: PropTypes.object,
  getHomeRecruitOrderList: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRecruitOrders)
