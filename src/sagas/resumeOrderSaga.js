import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { Toast } from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import {
  GET_HOME_RESUME_ORDER_LIST_REQUEST,
  GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST,
  POST_RESUME_ORDER_REQUEST,
  PUT_RESUME_ORDER_REQUEST,
  DELETE_RESUME_ORDER_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { resumeOrderService, userService } from '../services/leanclound'

function* postResumeOrderWorker(payload) {
  try {
    Toast.loading('提交中')
    const currentUser = yield call(userService.getCurrentUserAsync)
    const userinfo = yield call(userService.getUserInfoToJson, currentUser)
    const count = yield call(
      resumeOrderService.getResumeOrderCountOfToday,
      currentUser
    )
    const resumeOrderLimit = userinfo.resumeOrderLimit
    if (count < resumeOrderLimit) {
      const response = yield call(
        resumeOrderService.cerateResumeOrder,
        payload,
        userinfo,
        currentUser
      )
      yield put(action.postResumeOrderSuccess(response))
      Toast.success('提交成功', 1)
      yield delay(1000)
      yield put(NavigationActions.back())
    } else {
      yield put(action.postResumeOrderFailed())
      Toast.fail(`1天最多发布${resumeOrderLimit}条寻找战队帖`, 2)
      yield delay(2000)
      yield put(NavigationActions.back())
    }
  } catch (error) {
    yield put(action.postResumeOrderFailed(error))
    Toast.fail('提交失败', 1)
  }
}

function* putResumeOrderWorker(payload) {
  try {
    Toast.loading('提交中')
    const currentUser = yield call(userService.getCurrentUserAsync)
    const userinfo = yield call(userService.getUserInfoToJson, currentUser)
    const response = yield call(
      resumeOrderService.updateResumeOrder,
      payload,
      userinfo
    )
    yield put(action.putResumeOrderSuccess(response))
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(NavigationActions.back())
  } catch (error) {
    yield put(action.putResumeOrderFailed(error))
    Toast.fail('提交失败', 1)
  }
}

function* deleteResumeOrderWorker(payload) {
  try {
    Toast.loading('提交中')
    const response = yield call(resumeOrderService.removeResumeOrder, payload)
    yield put(action.deleteResumeOrderSuccess(response))
    Toast.success('删除成功', 1)
  } catch (error) {
    yield put(action.deleteResumeOrderFailed(error))
    Toast.fail('删除失败', 1)
  }
}

function* getAccountResumeOrderListWorker(payload) {
  try {
    Toast.loading('加载中')
    const currentUser = yield call(userService.getCurrentUserAsync)
    const response = yield call(
      resumeOrderService.getAccountResumeOrderList,
      payload,
      currentUser
    )
    yield put(action.getAccountResumeOrderListSuccess(response))
    Toast.hide()
  } catch (error) {
    yield put(action.getAccountResumeOrderListFailed(error))
    Toast.hide()
  }
}

function* getHomeResumeOrderListWorker(payload) {
  try {
    Toast.loading('加载中')
    const response = yield call(
      resumeOrderService.getHomeResumeOrderList,
      payload
    )
    yield put(action.getHomeResumeOrderListSuccess(response))
    Toast.hide()
  } catch (error) {
    yield put(action.getHomeResumeOrderListFailed(error))
    Toast.hide()
  }
}

function* watchPostResumeOrder() {
  while (true) {
    const { payload } = yield take(POST_RESUME_ORDER_REQUEST)
    yield fork(postResumeOrderWorker, payload)
  }
}

function* watchGetAccountResumeOrderList() {
  while (true) {
    const { payload } = yield take(GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST)
    yield fork(getAccountResumeOrderListWorker, payload)
  }
}

function* watchGetHomeResumeOrderList() {
  while (true) {
    const { payload } = yield take(GET_HOME_RESUME_ORDER_LIST_REQUEST)
    yield fork(getHomeResumeOrderListWorker, payload)
  }
}

function* watchPutResumeOrder() {
  while (true) {
    const { payload } = yield take(PUT_RESUME_ORDER_REQUEST)
    yield fork(putResumeOrderWorker, payload)
  }
}

function* watchDeleteResumeOrder() {
  while (true) {
    const { payload } = yield take(DELETE_RESUME_ORDER_REQUEST)
    yield fork(deleteResumeOrderWorker, payload)
  }
}

export {
  watchGetHomeResumeOrderList,
  watchPostResumeOrder,
  watchGetAccountResumeOrderList,
  watchPutResumeOrder,
  watchDeleteResumeOrder
}
