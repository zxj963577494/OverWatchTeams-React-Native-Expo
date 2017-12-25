import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { Toast } from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import {
  GET_HOME_WAR_ORDER_LIST_REQUEST,
  GET_ACCOUNT_WAR_ORDER_LIST_REQUEST,
  POST_WAR_ORDER_REQUEST,
  PUT_WAR_ORDER_REQUEST,
  DELETE_WAR_ORDER_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import {
  warOrderService,
  teamsService,
  userService
} from '../services/leanclound'

function* postWarOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const currentUser = yield call(userService.getCurrentUserAsync)
    const userinfo = yield call(userService.getUserInfoToJson, currentUser)
    const count = yield call(
      warOrderService.getWarOrderCountOfToday,
      currentUser
    )
    const warOrderLimit = userinfo.warOrderLimit
    if (count < warOrderLimit) {
      const team = yield call(teamsService.getTeamToJson, payload)
      const response = yield call(warOrderService.cerateWarOrder, payload, team, currentUser)
      yield put(action.fetchSuccess())
      yield put(action.postWarOrderSuccess(response))
      Toast.success('提交成功', 1)
      yield delay(1000)
      yield put(NavigationActions.back())
    } else {
      yield put(action.postWarOrderFailed())
      yield put(action.fetchFailed())
      Toast.success(`1天最多发布${warOrderLimit}条比赛约战帖`, 2)
      yield delay(2000)
      yield put(NavigationActions.back())
    }
  } catch (error) {
    yield put(action.postWarOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* putWarOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const currentUser = yield call(userService.getCurrentUserAsync)
    const team = yield call(teamsService.getTeam, payload)
    const response = yield call(
      warOrderService.updateWarOrder,
      payload,
      team,
      currentUser
    )
    yield put(action.fetchSuccess())
    yield put(action.putWarOrderSuccess(response))
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(NavigationActions.back())
  } catch (error) {
    yield put(action.putWarOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* deleteWarOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(warOrderService.removeWarOrder, payload)
    yield put(action.deleteWarOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('删除成功', 1)
  } catch (error) {
    yield put(action.deleteWarOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('删除失败', 1)
  }
}

function* getAccountWarOrderListWorker(payload) {
  try {
    const currentUser = yield call(userService.getCurrentUserAsync)
    const response = yield call(
      warOrderService.getAccountWarOrderList,
      payload,
      currentUser
    )
    yield put(action.getAccountWarOrderListSuccess(response))
  } catch (error) {
    yield put(action.getAccountWarOrderListFailed(error))
  }
}

function* getHomeWarOrderListWorker(payload) {
  try {
    const response = yield call(warOrderService.getHomeWarOrderList, payload)
    yield put(action.getHomeWarOrderListSuccess(response))
  } catch (error) {
    yield put(action.getHomeWarOrderListFailed(error))
  }
}

function* watchPostWarOrder() {
  while (true) {
    const { payload } = yield take(POST_WAR_ORDER_REQUEST)
    yield fork(postWarOrderWorker, payload)
  }
}

function* watchGetAccountWarOrderList() {
  while (true) {
    const { payload } = yield take(GET_ACCOUNT_WAR_ORDER_LIST_REQUEST)
    yield fork(getAccountWarOrderListWorker, payload)
  }
}

function* watchGetHomeWarOrderList() {
  while (true) {
    const { payload } = yield take(GET_HOME_WAR_ORDER_LIST_REQUEST)
    yield fork(getHomeWarOrderListWorker, payload)
  }
}

function* watchPutWarOrder() {
  while (true) {
    const { payload } = yield take(PUT_WAR_ORDER_REQUEST)
    yield fork(putWarOrderWorker, payload)
  }
}

function* watchDeleteWarOrder() {
  while (true) {
    const { payload } = yield take(DELETE_WAR_ORDER_REQUEST)
    yield fork(deleteWarOrderWorker, payload)
  }
}

export {
  watchGetHomeWarOrderList,
  watchPostWarOrder,
  watchGetAccountWarOrderList,
  watchPutWarOrder,
  watchDeleteWarOrder
}
