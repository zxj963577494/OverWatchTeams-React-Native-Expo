import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { getHomeTeamListRequest } from '../../../actions'
import { HomeTeamList } from '../../../components'

class HomeTeams extends Component {
  componentDidMount() {
    if (this.props.team.list.length === 0) {
      this.props.getHomeTeamList({ page: 1 })
    }
  }

  render() {
    const { team, navigateTo, getHomeTeamList } = this.props
    return (
      <View>
        <HomeTeamList
          team={team}
          navigateTo={navigateTo}
          getHomeTeamList={getHomeTeamList}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    team: state.team.home.team
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeTeamList: payload => {
      dispatch(getHomeTeamListRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

HomeTeams.propTypes = {
  team: PropTypes.object,
  getHomeTeamList: PropTypes.func,
  navigateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeams)
