import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
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
    Toast.loading('上传中')
    const response = yield call(commonService.uploadPic, payload)
    yield put(action.postUploadSuccess(response))
    Toast.success('上传成功', 1)
  } catch (error) {
    yield put(action.postUploadFailed(error))
    Toast.fail('上传失败', 1)
  }
}

function* sendEmailWorker(payload) {
  try {
    Toast.loading('邮件发送中')
    const response = yield call(commonService.requestEmailVerify, payload)
    yield put(action.sendEmailSuccess(response))
    Toast.success('发送成功', 1)
  } catch (error) {
    yield put(action.sendEmailFailed(error))
    Toast.fail('发送失败', 1)
  }
}

function* sendPasswordResetWorker(payload) {
  try {
    Toast.loading('上传中')
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
