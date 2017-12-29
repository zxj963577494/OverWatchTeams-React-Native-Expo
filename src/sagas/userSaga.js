import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { NavigationActions } from 'react-navigation'
import { Toast } from 'antd-mobile'
import {
  GET_CURRENTUSER_REQUEST,
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

function* getCurrentUserWorker() {
  try {
    const response = yield call(userService.getCurrentUserAsync)
    yield put(action.getCurrentUserSuccess(response))
  } catch (error) {
    yield put(action.getCurrentUserFailed())
  }
}

function* postSignUpWorker(payload) {
  try {
    Toast.loading('注册中')
    const response = yield call(userService.signUp, payload)
    yield put(action.postSignUpSuccess(response))
    Toast.success('注册成功', 1)
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Account' })]
      })
    )
  } catch (error) {
    Toast.fail('注册失败', 1)
    yield put(action.postSignUpFailed(error))
  }
}

function* postLoginWorker(payload) {
  try {
    Toast.loading('登录中')
    const response = yield call(userService.logIn, payload)
    yield put(action.postLoginSuccess(response))
    Toast.success('登录成功', 1)
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Account' })]
      })
    )
  } catch (error) {
    Toast.fail('登录失败', 1)
    yield put(action.postLoginFailed(error))
  }
}

function* postLogoutWorker() {
  try {
    yield call(userService.logOut)
    Toast.success('注销成功', 1)
    yield delay(1000)
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Account' })]
      })
    )
  } catch (error) {
    Toast.success('注销失败', 1)
  }
}

function* putUserInfoWorker(payload) {
  try {
    Toast.loading('提交中')
    const response = yield call(userService.putUserInfo, payload)
    yield put(action.putUserInfoSuccess(response))
    Toast.success('提交成功', 1.5)
    yield delay(1500)
    yield put(NavigationActions.back())
  } catch (error) {
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
    Toast.loading('加载中')
    const response = yield call(userService.getHomeUserInfoDetail, payload)
    yield put(action.getHomeUserInfoDetailSuccess(response))
    Toast.hide()
  } catch (error) {
    yield put(action.getHomeUserInfoDetailFailed(error))
    Toast.hide()
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

function* watchGetCurrentUser() {
  while (true) {
    yield take(GET_CURRENTUSER_REQUEST)
    yield fork(getCurrentUserWorker)
  }
}

export {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchGetUserInfo,
  watchPutUserInfo,
  watchGetHomeUserList,
  watchGetHomeUserDetail,
  watchGetCurrentUser
}
