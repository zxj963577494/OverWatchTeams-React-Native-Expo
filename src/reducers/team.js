import {
  POST_TEAMS_REQUEST,
  POST_TEAMS_SUCCESS,
  POST_TEAMS_FAILED,
  PUT_TEAMS_REQUEST,
  PUT_TEAMS_SUCCESS,
  PUT_TEAMS_FAILED,
  GET_MY_TEAMS_REQUEST,
  GET_MY_TEAMS_SUCCESS,
  GET_MY_TEAMS_FAILED,
  GET_IN_TEAMS_REQUEST,
  GET_IN_TEAMS_SUCCESS,
  GET_IN_TEAMS_FAILED,
  DELETE_TEAM_MEMBER_REQUEST,
  DELETE_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_MEMBER_FAILED,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILED,
  GET_HOME_TEAM_LIST_REQUEST,
  GET_HOME_TEAM_LIST_SUCCESS,
  GET_HOME_TEAM_LIST_FAILED,
  GET_HOME_TEAM_DETAIL_REQUEST,
  GET_HOME_TEAM_DETAIL_SUCCESS,
  GET_HOME_TEAM_DETAIL_FAILED
} from '../constants/actionTypes'

const initialTeamState = {
  home: {
    team: {
      list: [],
      current: {},
      isFetching: false,
      fetchingText: '加载中',
      isLoadMore: false,
      isRefreshing: false,
      page: 1,
      pagesize: 20
    }
  },
  account: {
    current: {},
    team: {
      myTeams: [],
      inTeams: []
    },
    pending: false
  }
}

function teamReducer(state = initialTeamState, action) {
  switch (action.type) {
    case POST_TEAMS_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            pending: true
          }
        }
      }
    case POST_TEAMS_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            myTeams: [...state.account.team.myTeams, action.payload],
            pending: false
          }
        },
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            myTeams: [...state.home.team.myTeams, action.payload]
          }
        }
      }
    case POST_TEAMS_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            pending: false
          }
        }
      }
    case PUT_TEAMS_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            pending: true
          }
        }
      }
    case PUT_TEAMS_SUCCESS:
      const data = state.account.team.myTeams.map(item => {
        if (item.objectId === action.payload.objectId) {
          return Object.assign(item, action.payload)
        } else {
          return item
        }
      })
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            myTeams: data
          }
        },
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            myTeams: data
          }
        }
      }
    case PUT_TEAMS_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            pending: false
          }
        }
      }
    case DELETE_TEAM_MEMBER_REQUEST:
      return state
    case DELETE_TEAM_MEMBER_SUCCESS:
      return state
    case DELETE_TEAM_MEMBER_FAILED:
      return state
    case DELETE_TEAM_REQUEST:
      return state
    case DELETE_TEAM_SUCCESS:
      const teams = state.account.team.myTeams.filter(
        x => x.objectId !== action.payload.objectId
      )
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            myTeams: teams
          }
        },
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            myTeams: teams
          }
        }
      }
    case DELETE_TEAM_FAILED:
      return state
    case GET_MY_TEAMS_REQUEST:
      return state
    case GET_MY_TEAMS_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            myTeams: [].concat(action.payload)
          }
        }
      }
    case GET_MY_TEAMS_FAILED:
      return state
    case GET_IN_TEAMS_REQUEST:
      return state
    case GET_IN_TEAMS_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          team: {
            ...state.account.team,
            inTeams: [].concat(action.payload)
          }
        }
      }
    case GET_IN_TEAMS_FAILED:
      return state
    case GET_HOME_TEAM_LIST_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing ? [] : state.home.team.list,
            page: action.payload.isRefreshing
              ? 1
              : action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_HOME_TEAM_LIST_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            list: state.home.team.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_HOME_TEAM_LIST_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case GET_HOME_TEAM_DETAIL_REQUEST:
      return state
    case GET_HOME_TEAM_DETAIL_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          team: {
            ...state.home.team,
            current: action.payload
          }
        }
      }
    case GET_HOME_TEAM_DETAIL_FAILED:
      return state
    default:
      return state
  }
}

export { teamReducer }
