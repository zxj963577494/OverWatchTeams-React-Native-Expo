import {
  GET_HOME_GROUP_ORDER_LIST_REQUEST,
  GET_HOME_GROUP_ORDER_LIST_SUCCESS,
  GET_HOME_GROUP_ORDER_LIST_FAILED,
  GET_ACCOUNT_GROUP_ORDER_LIST_REQUEST,
  GET_ACCOUNT_GROUP_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_GROUP_ORDER_LIST_FAILED,
  GET_GROUP_ORDER_DETAIL_REQUEST,
  GET_GROUP_ORDER_DETAIL_SUCCESS,
  GET_GROUP_ORDER_DETAIL_FAILED,
  POST_GROUP_ORDER_REQUEST,
  POST_GROUP_ORDER_SUCCESS,
  POST_GROUP_ORDER_FAILED,
  PUT_GROUP_ORDER_REQUEST,
  PUT_GROUP_ORDER_SUCCESS,
  PUT_GROUP_ORDER_FAILED,
  DELETE_GROUP_ORDER_REQUEST,
  DELETE_GROUP_ORDER_SUCCESS,
  DELETE_GROUP_ORDER_FAILED
} from '../constants/actionTypes'

const initialGroupOrderState = {
  home: {
    groupOrder: {
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
    groupOrder: {
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

function groupOrderReducer(state = initialGroupOrderState, action) {
  switch (action.type) {
    case GET_HOME_GROUP_ORDER_LIST_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            isFetching: action.payload.isRefreshing ? false : true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing ? [] : state.home.groupOrder.list,
            page: action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_HOME_GROUP_ORDER_LIST_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            list: state.home.groupOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_HOME_GROUP_ORDER_LIST_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case GET_ACCOUNT_GROUP_ORDER_LIST_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            page: action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_ACCOUNT_GROUP_ORDER_LIST_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            list: state.account.groupOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_ACCOUNT_GROUP_ORDER_LIST_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case POST_GROUP_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            pending: true
          }
        }
      }
    case POST_GROUP_ORDER_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            list: [...state.account.groupOrder.list, action.payload],
            pending: false
          }
        },
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            list: [...state.home.groupOrder.list, action.payload]
          }
        }
      }
    case POST_GROUP_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            pending: false
          }
        }
      }
    case PUT_GROUP_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            pending: true
          }
        }
      }
    case PUT_GROUP_ORDER_SUCCESS:
      const data = state.account.groupOrder.list.map(item => {
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
          groupOrder: {
            ...state.account.groupOrder,
            list: data,
            pending: false
          }
        },
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            list: data,
            pending: false
          }
        }
      }
    case PUT_GROUP_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            pending: false
          }
        }
      }
    case DELETE_GROUP_ORDER_REQUEST:
      return state
    case DELETE_GROUP_ORDER_SUCCESS:
      const list = state.account.groupOrder.list.filter(
        x => x.objectId !== action.payload.objectId
      )
      return {
        ...state,
        account: {
          ...state.account,
          groupOrder: {
            ...state.account.groupOrder,
            list: list
          }
        },
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            list: list
          }
        }
      }
    case DELETE_GROUP_ORDER_FAILED:
      return state
    case GET_GROUP_ORDER_DETAIL_REQUEST:
      return state
    case GET_GROUP_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          groupOrder: {
            ...state.home.groupOrder,
            current: action.payload
          }
        }
      }
    case GET_GROUP_ORDER_DETAIL_FAILED:
      return state
    default:
      return state
  }
}

export { groupOrderReducer }
