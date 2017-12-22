import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { NavigationActions } from 'react-navigation'
import { Toast } from 'antd-mobile'
import {
  POST_SIGNUP_REQUEST,
  POST_LOGIN_REQUEST,
  POST_LOGOUT_REQUEST,
  PUT_USERINFO_REQUEST,
  GET_USERINFO_REQUEST,
  GET_HOME_USERINFO_LIST_REQUEST,
  GET_HOME_USERINFO_DETAIL_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { userService } from '../services/leanclound'

function* postSignUpWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '注册中' }))
    const response = yield call(userService.signUp, payload)
    yield put(action.fetchSuccess())
    yield put(action.postSignUpSuccess(response))
    yield put(NavigationActions.navigate({ routeName: 'Account'}))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.postSignUpFailed(error))
  }
}

function* postLoginWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '登录中' }))
    const response = yield call(userService.logIn, payload)
    yield put(action.fetchSuccess())
    yield put(action.postLoginSuccess(response))
    yield put(NavigationActions.navigate({ routeName: 'Account'}))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.postLoginFailed(error))
  }
}

function* postLogoutWorker() {
  try {
    yield call(userService.logOut)
    Toast.success('注销成功', 1)
    yield delay(1000)
    yield put(NavigationActions.navigate({ routeName: 'Home'}))
  } catch (error) {
    yield put(action.fetchFailed())
  }
}

function* putUserInfoWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(userService.putUserInfo, payload)
    yield put(action.fetchSuccess())
    yield put(action.putUserInfoSuccess(response))
    Toast.success('提交成功', 1.5)
    yield delay(1500)
    yield put(NavigationActions.back())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.putUserInfoFailed(error))
    Toast.fail('提交失败', 1.5)
  }
}

function* getUserInfoWorker() {
  try {
    const currentUser = yield call(userService.getCurrentUserAsync)
    const response = yield call(userService.getUserInfoToJson, currentUser)
    yield put(action.getUserInfoSuccess(response))
  } catch (error) {
    yield put(action.getUserInfoFailed(error))
  }
}

function* getHomeUserInfoListWorker(payload) {
  try {
    const response = yield call(userService.getHomeUserInfoList, payload)
    yield put(action.getHomeUserInfoListSuccess(response))
  } catch (error) {
    yield put(action.getHomeUserInfoListFailed(error))
  }
}

function* getHomeUserInfoDetailWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const response = yield call(userService.getHomeUserInfoDetail, payload)
    yield put(action.getHomeUserInfoDetailSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.getHomeUserInfoDetailFailed(error))
    yield put(action.fetchFailed())
  }
}

function* watchLogin() {
  while (true) {
    const { payload } = yield take(POST_LOGIN_REQUEST)
    yield fork(postLoginWorker, payload)
  }
}

function* watchSignUp() {
  while (true) {
    const { payload } = yield take(POST_SIGNUP_REQUEST)
    yield fork(postSignUpWorker, payload)
  }
}

function* watchLogout() {
  while (true) {
    yield take(POST_LOGOUT_REQUEST)
    yield fork(postLogoutWorker)
  }
}

function* watchPutUserInfo() {
  while (true) {
    const { payload } = yield take(PUT_USERINFO_REQUEST)
    yield fork(putUserInfoWorker, payload)
  }
}

function* watchGetUserInfo() {
  while (true) {
    yield take(GET_USERINFO_REQUEST)
    yield fork(getUserInfoWorker)
  }
}

function* watchGetHomeUserList() {
  while (true) {
    const { payload } = yield take(GET_HOME_USERINFO_LIST_REQUEST)
    yield fork(getHomeUserInfoListWorker, payload)
  }
}

function* watchGetHomeUserDetail() {
  while (true) {
    const { payload } = yield take(GET_HOME_USERINFO_DETAIL_REQUEST)
    yield fork(getHomeUserInfoDetailWorker, payload)
  }
}

export {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchGetUserInfo,
  watchPutUserInfo,
  watchGetHomeUserList,
  watchGetHomeUserDetail
}
