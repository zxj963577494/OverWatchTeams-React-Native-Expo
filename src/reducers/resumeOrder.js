import {
  GET_HOME_RESUME_ORDER_LIST_REQUEST,
  GET_HOME_RESUME_ORDER_LIST_SUCCESS,
  GET_HOME_RESUME_ORDER_LIST_FAILED,
  GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST,
  GET_ACCOUNT_RESUME_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_RESUME_ORDER_LIST_FAILED,
  GET_RESUME_ORDER_DETAIL_REQUEST,
  GET_RESUME_ORDER_DETAIL_SUCCESS,
  GET_RESUME_ORDER_DETAIL_FAILED,
  POST_RESUME_ORDER_REQUEST,
  POST_RESUME_ORDER_SUCCESS,
  POST_RESUME_ORDER_FAILED,
  PUT_RESUME_ORDER_REQUEST,
  PUT_RESUME_ORDER_SUCCESS,
  PUT_RESUME_ORDER_FAILED,
  DELETE_RESUME_ORDER_REQUEST,
  DELETE_RESUME_ORDER_SUCCESS,
  DELETE_RESUME_ORDER_FAILED
} from '../constants/actionTypes'

const initialResumeOrderState = {
  home: {
    resumeOrder: {
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
    resumeOrder: {
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

function resumeOrderReducer(state = initialResumeOrderState, action) {
  switch (action.type) {
    case GET_HOME_RESUME_ORDER_LIST_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          resumeOrder: {
            ...state.home.resumeOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            page: action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_HOME_RESUME_ORDER_LIST_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          resumeOrder: {
            ...state.home.resumeOrder,
            list: state.home.resumeOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_HOME_RESUME_ORDER_LIST_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          resumeOrder: {
            ...state.home.resumeOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing ? [] : state.account.resumeOrder.list,
            page: action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_ACCOUNT_RESUME_ORDER_LIST_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            list: state.account.resumeOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_ACCOUNT_RESUME_ORDER_LIST_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case POST_RESUME_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            pending: true
          }
        }
      }
    case POST_RESUME_ORDER_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            list: [...state.account.resumeOrder.list, action.payload],
            pending: false
          }
        },
        home: {
          ...state.home,
          resumeOrder: {
            ...state.home.resumeOrder,
            list: [...state.home.resumeOrder.list, action.payload],
          }
        }
      }
    case POST_RESUME_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            pending: false
          }
        }
      }
    case PUT_RESUME_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            pending: true
          }
        }
      }
    case PUT_RESUME_ORDER_SUCCESS:
      const data = state.account.resumeOrder.list.map(item => {
        if (item.objectId === action.payload.objectId) {
          return {
            ...item,
            ...action.payload
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            list: data,
            pending: false
          }
        },
        home: {
          ...state.account,
          home: {
            ...state.home.resumeOrder,
            list: data,
            pending: false
          }
        }
      }
    case PUT_RESUME_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            pending: false
          }
        }
      }
    case DELETE_RESUME_ORDER_REQUEST:
      return state
    case DELETE_RESUME_ORDER_SUCCESS:
      const list = state.account.resumeOrder.list.filter(
        x => x.objectId !== action.payload.objectId
      )
      return {
        ...state,
        account: {
          ...state.account,
          resumeOrder: {
            ...state.account.resumeOrder,
            list: list
          }
        },
        home: {
          ...state.home,
          resumeOrder: {
            ...state.home.resumeOrder,
            list: list
          }
        }
      }
    case DELETE_RESUME_ORDER_FAILED:
      return state
    case GET_RESUME_ORDER_DETAIL_REQUEST:
      return state
    case GET_RESUME_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          resumeOrder: {
            ...state.home.resumeOrder,
            current: action.payload
          }
        }
      }
    case GET_RESUME_ORDER_DETAIL_FAILED:
      return state
    default:
      return state
  }
}

export { resumeOrderReducer }
