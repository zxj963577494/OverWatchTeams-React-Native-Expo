import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  SEND_PASSWORD_RESET_REQUEST,
  SEND_PASSWORD_RESET_SUCCESS,
  SEND_PASSWORD_RESET_FAILED
} from '../constants/actionTypes'

const initialAppState = {
  isFetching: false,
  text: '',
  file: {},
  emailError: ''
}

function appReducer(state = initialAppState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        text: action.payload.text
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case FETCH_FAILED:
      return {
        ...state,
        isFetching: false
      }
    case POST_UPLOAD_REQUEST:
      return state
    case POST_UPLOAD_SUCCESS:
      return { ...state, file: action.payload }
    case POST_UPLOAD_FAILED:
      return state
    case SEND_EMAIL_REQUEST:
      return { ...state, emailError: '正在发送...' }
    case SEND_EMAIL_SUCCESS:
      return { ...state, emailError: '发送成功' }
    case SEND_EMAIL_FAILED:
      return { ...state, emailError: '发送失败' }
    case SEND_PASSWORD_RESET_REQUEST:
      return state
    case SEND_PASSWORD_RESET_SUCCESS:
      return state
    case SEND_PASSWORD_RESET_FAILED:
      return state
    default:
      return state
  }
}

export { appReducer }
