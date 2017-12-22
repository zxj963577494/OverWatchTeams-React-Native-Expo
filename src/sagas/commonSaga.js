import { put, fork, take, call } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import {
  POST_UPLOAD_REQUEST,
  SEND_EMAIL_REQUEST,
  SEND_PASSWORD_RESET_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { commonService, userService } from '../services/leanclound'

function* postUploadWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '上传中' }))
    console.warn(payload)
    const response = yield call(commonService.uploadPic, payload)
    yield put(action.postUploadSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    console.warn(error)
    yield put(action.postUploadFailed(error))
    yield put(action.fetchFailed())
  }
}

function* sendEmailWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(commonService.requestEmailVerify, payload)
    yield put(action.sendEmailSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.sendEmailFailed(error))
    yield put(action.fetchFailed())
  }
}

function* sendPasswordResetWorker(payload) {
  try {
    const response = yield call(commonService.requestPasswordReset, payload)
    yield put(action.sendPasswordResetSuccess(response))
    yield call(userService.logOut)
    yield put(NavigationActions.navigate('Home'))
    Toast.success('重置密码的邮件已发送', 1.5)
  } catch (error) {
    yield put(action.sendPasswordResetFailed(error))
    Toast.fail('重置密码的邮件发送失败', 1.5)
  }
}

function* watchUpload() {
  while (true) {
    const { payload } = yield take(POST_UPLOAD_REQUEST)
    yield fork(postUploadWorker, payload)
  }
}

function* watchSendEmail() {
  while (true) {
    const { payload } = yield take(SEND_EMAIL_REQUEST)
    yield fork(sendEmailWorker, payload)
  }
}

function* watchSendPasswordReset() {
  while (true) {
    const { payload } = yield take(SEND_PASSWORD_RESET_REQUEST)
    yield fork(sendPasswordResetWorker, payload)
  }
}

export { watchUpload, watchSendEmail, watchSendPasswordReset }
