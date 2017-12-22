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
    yield put(action.fetchRequest({ text: '提交中' }))
    const currentUser = yield call(userService.getCurrentUserAsync)
    const userinfo = yield call(userService.getUserInfoToJson, currentUser)
    const count = yield call(resumeOrderService.getResumeOrderCountOfToday)
    const resumeOrderLimit = userinfo.resumeOrderLimit
    if (count <= resumeOrderLimit) {
      const response = yield call(
        resumeOrderService.cerateResumeOrder,
        payload,
        userinfo,
        currentUser
      )
      yield put(action.postResumeOrderSuccess(response))
      yield put(action.fetchSuccess())
      Toast.success('提交成功', 1)
      yield delay(1000)
      yield put(NavigationActions.navigate({ routeName: 'AccountResumeOrders'}))
    } else {
      yield put(action.postResumeOrderFailed())
      yield put(action.fetchFailed())
      Toast.success(`1天最多发布${resumeOrderLimit}条寻找队友帖`, 1)
    }
  } catch (error) {
    yield put(action.postResumeOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* putResumeOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const currentUser = yield call(userService.getCurrentUserAsync)
    const response = yield call(resumeOrderService.updateResumeOrder, payload, currentUser)
    yield put(action.putResumeOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(NavigationActions.navigate({ routeName: 'AccountResumeOrders'}))
  } catch (error) {
    yield put(action.putResumeOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* deleteResumeOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(resumeOrderService.removeResumeOrder, payload)
    yield put(action.deleteResumeOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('删除成功', 1)
  } catch (error) {
    yield put(action.deleteResumeOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('删除失败', 1)
  }
}

function* getAccountResumeOrderListWorker(payload) {
  try {
    const currentUser = yield call(userService.getCurrentUserAsync)
    const response = yield call(
      resumeOrderService.getAccountResumeOrderList,
      payload,
      currentUser
    )
    yield put(action.getAccountResumeOrderListSuccess(response))
  } catch (error) {
    yield put(action.getAccountResumeOrderListFailed(error))
  }
}

function* getHomeResumeOrderListWorker(payload) {
  try {
    const response = yield call(
      resumeOrderService.getHomeResumeOrderList,
      payload
    )
    yield put(action.getHomeResumeOrderListSuccess(response))
  } catch (error) {
    yield put(action.getHomeResumeOrderListFailed(error))
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
