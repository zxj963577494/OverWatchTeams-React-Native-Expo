import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
//import { goBack } from 'react-router-redux'
//import { Toast } from 'antd-mobile'
import {
  POST_TEAMS_REQUEST,
  PUT_TEAMS_REQUEST,
  DELETE_TEAM_MEMBER_REQUEST,
  DELETE_TEAM_REQUEST,
  GET_HOME_TEAM_LIST_REQUEST,
  GET_HOME_TEAM_DETAIL_REQUEST,
  GET_MY_TEAMS_REQUEST,
  GET_IN_TEAMS_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { teamsService, userService } from '../services/leanclound'

function* postTeamsWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const team = yield call(teamsService.getMyTeams, payload)
    const usr = yield call(userService.getCurrentUser)
    if(team.length < usr.get('teamLimit')) {
      const response = yield call(teamsService.cerateTeam, payload)
      yield put(action.fetchSuccess())
      yield put(action.postTeamsSuccess(response))
      Toast.success('提交成功', 1)
      yield delay(1000)
      yield put(goBack())
    }
    else {
      Toast.fail('提交失败，每位用户最多可创建一支战队，若想创建多支战队，请联系管理员963577494@qq.com', 3)
      yield put(action.fetchFailed())
      yield put(action.postTeamsFailed())
    }
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.postTeamsFailed())
    Toast.fail('提交失败', 1)
  }
}

function* putTeamsWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(teamsService.updateTeam, payload)
    yield put(action.fetchSuccess())
    yield put(action.putTeamsSuccess(response))
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(goBack())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.putTeamsFailed())
    Toast.fail('提交失败', 1)
  }
}

function* getInTeamsWorker() {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const response = yield call(teamsService.getInTeams)
    yield put(action.getInTeamsSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.getInTeamsFailed(error))
  }
}

function* getMyTeamsWorker() {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const response = yield call(teamsService.getMyTeams)
    yield put(action.getMyTeamsSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.getMyTeamsFailed(error))
  }
}

function* deleteTeamMemberWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(teamsService.removeMember, payload)
    yield put(action.deleteTeamMemberSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('移除队员成功', 1.5)
    yield delay(1500)
    yield put(goBack())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.deleteTeamMemberFailed(error))
    Toast.fail(error.message, 1.5)
  }
}

function* deleteTeamWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(teamsService.removeTeam, payload)
    yield put(action.deleteTeamSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('解散队伍成功', 1.5)
    yield delay(1500)
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.deleteTeamFailed(error))
    Toast.fail(error.message, 1.5)
  }
}

function* getHomeTeamListWorker(payload) {
  try {
    const response = yield call(teamsService.getHomeTeamsList, payload)
    yield put(action.getHomeTeamListSuccess(response))
  } catch (error) {
    yield put(action.getHomeTeamListFailed(error))
  }
}

function* getHomeTeamDetailWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const response = yield call(teamsService.getHomeTeamDetail, payload)
    yield put(action.getHomeTeamDetailSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.getHomeTeamDetailFailed(error))
    yield put(action.fetchFailed())
  }
}

function* watchPostTeams() {
  while (true) {
    const { payload } = yield take(POST_TEAMS_REQUEST)
    yield fork(postTeamsWorker, payload)
  }
}

function* watchPutTeams() {
  while (true) {
    const { payload } = yield take(PUT_TEAMS_REQUEST)
    yield fork(putTeamsWorker, payload)
  }
}

function* watchDeleteTeamMember() {
  while (true) {
    const { payload } = yield take(DELETE_TEAM_MEMBER_REQUEST)
    yield fork(deleteTeamMemberWorker, payload)
  }
}

function* watchDeleteTeam() {
  while (true) {
    const { payload } = yield take(DELETE_TEAM_REQUEST)
    yield fork(deleteTeamWorker, payload)
  }
}

function* watchGetHomeTeamList() {
  while (true) {
    const { payload } = yield take(GET_HOME_TEAM_LIST_REQUEST)
    yield fork(getHomeTeamListWorker, payload)
  }
}

function* watchGetHomeTeamDetail() {
  while (true) {
    const { payload } = yield take(GET_HOME_TEAM_DETAIL_REQUEST)
    yield fork(getHomeTeamDetailWorker, payload)
  }
}

function* watchGetMyTeams() {
  while (true) {
    yield take(GET_MY_TEAMS_REQUEST)
    yield fork(getMyTeamsWorker)
  }
}

function* watchGetInTeams() {
  while (true) {
    yield take(GET_IN_TEAMS_REQUEST)
    yield fork(getInTeamsWorker)
  }
}

export {
  watchPostTeams,
  watchPutTeams,
  watchDeleteTeamMember,
  watchDeleteTeam,
  watchGetHomeTeamList,
  watchGetHomeTeamDetail,
  watchGetMyTeams,
  watchGetInTeams
}
