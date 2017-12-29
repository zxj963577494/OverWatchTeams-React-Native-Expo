import {
  GET_HOME_RECRUIT_ORDER_LIST_REQUEST,
  GET_HOME_RECRUIT_ORDER_LIST_SUCCESS,
  GET_HOME_RECRUIT_ORDER_LIST_FAILED,
  GET_ACCOUNT_RECRUIT_ORDER_LIST_REQUEST,
  GET_ACCOUNT_RECRUIT_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_RECRUIT_ORDER_LIST_FAILED,
  GET_RECRUIT_ORDER_DETAIL_REQUEST,
  GET_RECRUIT_ORDER_DETAIL_SUCCESS,
  GET_RECRUIT_ORDER_DETAIL_FAILED,
  POST_RECRUIT_ORDER_REQUEST,
  POST_RECRUIT_ORDER_SUCCESS,
  POST_RECRUIT_ORDER_FAILED,
  PUT_RECRUIT_ORDER_REQUEST,
  PUT_RECRUIT_ORDER_SUCCESS,
  PUT_RECRUIT_ORDER_FAILED,
  DELETE_RECRUIT_ORDER_REQUEST,
  DELETE_RECRUIT_ORDER_SUCCESS,
  DELETE_RECRUIT_ORDER_FAILED
} from '../constants/actionTypes'

const initialRecruitOrderState = {
  home: {
    recruitOrder: {
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
    recruitOrder: {
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

function recruitOrderReducer(state = initialRecruitOrderState, action) {
  switch (action.type) {
    case GET_HOME_RECRUIT_ORDER_LIST_REQUEST:
      return {
        ...state,
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing
              ? []
              : state.home.recruitOrder.list,
            page: action.payload.isRefreshing
              ? 1
              : action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_HOME_RECRUIT_ORDER_LIST_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            list: state.home.recruitOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_HOME_RECRUIT_ORDER_LIST_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case GET_ACCOUNT_RECRUIT_ORDER_LIST_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            isFetching: true,
            isRefreshing: action.payload.isRefreshing || false,
            list: action.payload.isRefreshing
              ? []
              : state.account.recruitOrder.list,
            page: action.payload.isRefreshing ? 1 : action.payload.page ? action.payload.page : 1
          }
        }
      }
    case GET_ACCOUNT_RECRUIT_ORDER_LIST_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            list: state.account.recruitOrder.list.concat(action.payload),
            isFetching: false,
            isRefreshing: false,
            isLoadMore: action.payload.length < 20 ? false : true
          }
        }
      }
    case GET_ACCOUNT_RECRUIT_ORDER_LIST_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            isFetching: false,
            isRefreshing: false
          }
        }
      }
    case POST_RECRUIT_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            pending: true
          }
        }
      }
    case POST_RECRUIT_ORDER_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            list: [...state.account.recruitOrder.list, action.payload],
            pending: false
          }
        },
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            list: [...state.home.recruitOrder.list, action.payload]
          }
        }
      }
    case POST_RECRUIT_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            pending: false
          }
        }
      }
    case PUT_RECRUIT_ORDER_REQUEST:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            pending: true
          }
        }
      }
    case PUT_RECRUIT_ORDER_SUCCESS:
      const data = state.account.recruitOrder.list.map(item => {
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
          recruitOrder: {
            ...state.account.recruitOrder,
            list: data,
            pending: false
          }
        },
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            list: data
          }
        }
      }
    case PUT_RECRUIT_ORDER_FAILED:
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            pending: false
          }
        }
      }
    case DELETE_RECRUIT_ORDER_REQUEST:
      return state
    case DELETE_RECRUIT_ORDER_SUCCESS:
      const list = state.account.recruitOrder.list.filter(
        x => x.objectId !== action.payload.objectId
      )
      return {
        ...state,
        account: {
          ...state.account,
          recruitOrder: {
            ...state.account.recruitOrder,
            list: list
          }
        },
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            list: list
          }
        }
      }
    case DELETE_RECRUIT_ORDER_FAILED:
      return state
    case GET_RECRUIT_ORDER_DETAIL_REQUEST:
      return state
    case GET_RECRUIT_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          recruitOrder: {
            ...state.home.recruitOrder,
            current: action.payload
          }
        }
      }
    case GET_RECRUIT_ORDER_DETAIL_FAILED:
      return state
    default:
      return state
  }
}

export { recruitOrderReducer }
