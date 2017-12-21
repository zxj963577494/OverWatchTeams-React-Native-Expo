import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAILED,
  PUT_USERINFO_REQUEST,
  PUT_USERINFO_SUCCESS,
  PUT_USERINFO_FAILED,
  GET_USERINFO_REQUEST,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILED,
  GET_HOME_USERINFO_LIST_REQUEST,
  GET_HOME_USERINFO_LIST_SUCCESS,
  GET_HOME_USERINFO_LIST_FAILED,
  GET_HOME_USERINFO_DETAIL_REQUEST,
  GET_HOME_USERINFO_DETAIL_SUCCESS,
  GET_HOME_USERINFO_DETAIL_FAILED
} from '../constants/actionTypes'
import { HEROS } from '../constants'

const initialUserState = {
  home: {
    loginError: '',
    signupError: '',
    userinfo: {
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
    user: {},
    userinfo: {
      isLoaded: false,
      position: 'DPS',
      rank: 'top500',
      pending: false
    }
  }
}

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return { ...state, home: { ...state.home, loginError: '' } }
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        home: { ...state.home, loginError: '' },
        account: { ...state.account, user: action.payload }
      }
    case POST_LOGIN_FAILED:
      return {
        ...state,
        home: { ...state.home, loginError: action.payload.rawMessage }
      }
    case POST_SIGNUP_REQUEST:
      return {
        ...state,
        home: { ...state.home, signupError: '' }
      }
    case POST_SIGNUP_SUCCESS:
      return {
        ...state,
        home: { ...state.home, loginError: '' },
        account: { ...state.account, user: {} }
      }
    case POST_SIGNUP_FAILED:
      return {
        ...state,
        home: { ...state.home, signupError: action.payload.rawMessage }
      }
    case PUT_USERINFO_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          userinfo: {
            ...state.account.userinfo,
            pending: true
          }
        }
      }
    case PUT_USERINFO_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          userinfo: {
            ...state.account.userinfo,
            ...action.payload,
            heros: merge(HEROS, action.payload.heros),
            pending: false,
            isLoaded: true
          }
        }
      }
    case PUT_USERINFO_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          userinfo: {
            ...state.account.userinfo,
            pending: false
          }
        }
      }
    case GET_USERINFO_REQUEST:
      return state
    case GET_USERINFO_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          userinfo: {
            ...state.account.userinfo,
            ...action.payload,
            heros: merge(HEROS, action.payload.heros),
            isLoaded: true
          }
        }
      }
    case GET_USERINFO_FAILED:
      return state
    case GET_HOME_USERINFO_LIST_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          userinfo: {
            ...state.home.userinfo,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing ? [] : state.home.userinfo.list,
            page: action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_HOME_USERINFO_LIST_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          userinfo: {
            ...state.home.userinfo,
            list: state.home.userinfo.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_HOME_USERINFO_LIST_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          userinfo: {
            ...state.home.userinfo,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case GET_HOME_USERINFO_DETAIL_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          userinfo: {
            ...state.home.userinfo,
            isFetching: true
          }
        }
      }
    case GET_HOME_USERINFO_DETAIL_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          userinfo: {
            ...state.home.userinfo,
            isFetching: false,
            current: action.payload
          }
        }
      }
    case GET_HOME_USERINFO_DETAIL_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          userinfo: {
            ...state.home.userinfo,
            isFetching: false
          }
        }
      }
    default:
      return state
  }
}

function merge(o1, o2) {
  if (o2) {
    const result = o1.map(item1 => {
      return Object.assign(
        item1,
        o2.find(item2 => {
          return item2 && item1.value === item2.value
        })
      )
    })
    return result
  }
}

export { userReducer }
