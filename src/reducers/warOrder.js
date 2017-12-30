import {
  GET_HOME_WAR_ORDER_LIST_REQUEST,
  GET_HOME_WAR_ORDER_LIST_SUCCESS,
  GET_HOME_WAR_ORDER_LIST_FAILED,
  GET_ACCOUNT_WAR_ORDER_LIST_REQUEST,
  GET_ACCOUNT_WAR_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_WAR_ORDER_LIST_FAILED,
  GET_WAR_ORDER_DETAIL_REQUEST,
  GET_WAR_ORDER_DETAIL_SUCCESS,
  GET_WAR_ORDER_DETAIL_FAILED,
  POST_WAR_ORDER_REQUEST,
  POST_WAR_ORDER_SUCCESS,
  POST_WAR_ORDER_FAILED,
  PUT_WAR_ORDER_REQUEST,
  PUT_WAR_ORDER_SUCCESS,
  PUT_WAR_ORDER_FAILED,
  DELETE_WAR_ORDER_REQUEST,
  DELETE_WAR_ORDER_SUCCESS,
  DELETE_WAR_ORDER_FAILED
} from '../constants/actionTypes'

const initialWarOrderState = {
  home: {
    warOrder: {
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
    warOrder: {
      list: [],
      current: {},
      isFetching: false,
      fetchingText: '加载中',
      isLoadMore: false,
      isRefreshing: false,
      page: 1,
      pagesize: 20,
      pending: false
    }
  }
}

function warOrderReducer(state = initialWarOrderState, action) {
  switch (action.type) {
    case GET_HOME_WAR_ORDER_LIST_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          warOrder: {
            ...state.home.warOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing ? [] : state.home.warOrder.list,
            page: action.payload.isRefreshing
              ? 1
              : action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_HOME_WAR_ORDER_LIST_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          warOrder: {
            ...state.home.warOrder,
            list: state.home.warOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_HOME_WAR_ORDER_LIST_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          warOrder: {
            ...state.home.warOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case GET_ACCOUNT_WAR_ORDER_LIST_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing
              ? []
              : state.account.warOrder.list,
            page: action.payload.isRefreshing
              ? 1
              : action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_ACCOUNT_WAR_ORDER_LIST_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            list: state.account.warOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_ACCOUNT_WAR_ORDER_LIST_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case POST_WAR_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            pending: true
          }
        }
      }
    case POST_WAR_ORDER_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            list: [...state.account.warOrder.list, action.payload],
            pending: false
          }
        },
        home: {
          ...state.home,
          warOrder: {
            ...state.home.warOrder,
            list: [...state.home.warOrder.list, action.payload]
          }
        }
      }
    case POST_WAR_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            pending: false
          }
        }
      }
    case PUT_WAR_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            pending: true
          }
        }
      }
    case PUT_WAR_ORDER_SUCCESS:
      const data = state.account.warOrder.list.map(item => {
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
          warOrder: {
            ...state.account.warOrder,
            list: data,
            pending: false
          }
        }
      }
    case PUT_WAR_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            pending: false
          }
        }
      }
    case DELETE_WAR_ORDER_REQUEST:
      return state
    case DELETE_WAR_ORDER_SUCCESS:
      const list = state.account.warOrder.list.filter(
        x => x.objectId !== action.payload.objectId
      )
      return {
        ...state,
        account: {
          ...state.account,
          warOrder: {
            ...state.account.warOrder,
            list: list
          }
        },
        home: {
          ...state.home,
          warOrder: {
            ...state.home.warOrder,
            list: list
          }
        }
      }
    case DELETE_WAR_ORDER_FAILED:
      return state
    case GET_WAR_ORDER_DETAIL_REQUEST:
      return state
    case GET_WAR_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          warOrder: {
            ...state.home.warOrder,
            current: action.payload
          }
        }
      }
    case GET_WAR_ORDER_DETAIL_FAILED:
      return state
    default:
      return state
  }
}

export { warOrderReducer }
