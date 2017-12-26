import {
  GET_CURRENTUSER_REQUEST,
  GET_CURRENTUSER_SUCCESS,
  GET_CURRENTUSER_FAILED,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAILED,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILED,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  GET_USERINFO_REQUEST,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILED,
  PUT_USERINFO_REQUEST,
  PUT_USERINFO_SUCCESS,
  PUT_USERINFO_FAILED,
  POST_TEAMS_REQUEST,
  POST_TEAMS_SUCCESS,
  POST_TEAMS_FAILED,
  PUT_TEAMS_REQUEST,
  PUT_TEAMS_SUCCESS,
  PUT_TEAMS_FAILED,
  GET_MY_TEAMS_REQUEST,
  GET_MY_TEAMS_SUCCESS,
  GET_MY_TEAMS_FAILED,
  GET_IN_TEAMS_REQUEST,
  GET_IN_TEAMS_SUCCESS,
  GET_IN_TEAMS_FAILED,
  DELETE_TEAM_MEMBER_REQUEST,
  DELETE_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_MEMBER_FAILED,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILED,
  GET_HOME_USERINFO_DETAIL_REQUEST,
  GET_HOME_USERINFO_DETAIL_SUCCESS,
  GET_HOME_USERINFO_DETAIL_FAILED,
  GET_HOME_USERINFO_LIST_REQUEST,
  GET_HOME_USERINFO_LIST_SUCCESS,
  GET_HOME_USERINFO_LIST_FAILED,
  GET_HOME_TEAM_DETAIL_REQUEST,
  GET_HOME_TEAM_DETAIL_SUCCESS,
  GET_HOME_TEAM_DETAIL_FAILED,
  GET_HOME_TEAM_LIST_REQUEST,
  GET_HOME_TEAM_LIST_SUCCESS,
  GET_HOME_TEAM_LIST_FAILED,
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
  DELETE_RECRUIT_ORDER_FAILED,
  GET_HOME_GROUP_ORDER_LIST_REQUEST,
  GET_HOME_GROUP_ORDER_LIST_SUCCESS,
  GET_HOME_GROUP_ORDER_LIST_FAILED,
  GET_ACCOUNT_GROUP_ORDER_LIST_REQUEST,
  GET_ACCOUNT_GROUP_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_GROUP_ORDER_LIST_FAILED,
  GET_GROUP_ORDER_DETAIL_REQUEST,
  GET_GROUP_ORDER_DETAIL_SUCCESS,
  GET_GROUP_ORDER_DETAIL_FAILED,
  POST_GROUP_ORDER_REQUEST,
  POST_GROUP_ORDER_SUCCESS,
  POST_GROUP_ORDER_FAILED,
  PUT_GROUP_ORDER_REQUEST,
  PUT_GROUP_ORDER_SUCCESS,
  PUT_GROUP_ORDER_FAILED,
  DELETE_GROUP_ORDER_REQUEST,
  DELETE_GROUP_ORDER_SUCCESS,
  DELETE_GROUP_ORDER_FAILED,
  GET_HOME_WAR_ORDER_LIST_REQUEST,
  GET_HOME_WAR_ORDER_LIST_SUCCESS,
  GET_HOME_WAR_ORDER_LIST_FAILED,
  GET_ACCOUNT_WAR_ORDER_LIST_REQUEST,
  GET_ACCOUNT_WAR_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_WAR_ORDER_LIST_FAILED,
  GET_WAR_ORDER_DETAIL_REQUEST,
  GET_WAR_ORDER_DETAIL_SUCCESS,
  GET_WAR_ORDER_DETAIL_FAILED,
  POST_WAR_ORDER_REQUEST,
  POST_WAR_ORDER_SUCCESS,
  POST_WAR_ORDER_FAILED,
  PUT_WAR_ORDER_REQUEST,
  PUT_WAR_ORDER_SUCCESS,
  PUT_WAR_ORDER_FAILED,
  DELETE_WAR_ORDER_REQUEST,
  DELETE_WAR_ORDER_SUCCESS,
  DELETE_WAR_ORDER_FAILED,
  GET_HOME_RESUME_ORDER_LIST_REQUEST,
  GET_HOME_RESUME_ORDER_LIST_SUCCESS,
  GET_HOME_RESUME_ORDER_LIST_FAILED,
  GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST,
  GET_ACCOUNT_RESUME_ORDER_LIST_SUCCESS,
  GET_ACCOUNT_RESUME_ORDER_LIST_FAILED,
  GET_RESUME_ORDER_DETAIL_REQUEST,
  GET_RESUME_ORDER_DETAIL_SUCCESS,
  GET_RESUME_ORDER_DETAIL_FAILED,
  POST_RESUME_ORDER_REQUEST,
  POST_RESUME_ORDER_SUCCESS,
  POST_RESUME_ORDER_FAILED,
  PUT_RESUME_ORDER_REQUEST,
  PUT_RESUME_ORDER_SUCCESS,
  PUT_RESUME_ORDER_FAILED,
  DELETE_RESUME_ORDER_REQUEST,
  DELETE_RESUME_ORDER_SUCCESS,
  DELETE_RESUME_ORDER_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  SEND_PASSWORD_RESET_REQUEST,
  SEND_PASSWORD_RESET_SUCCESS,
  SEND_PASSWORD_RESET_FAILED,
} from '../constants/actionTypes'

export const getCurrentUserRequest = function() {
  return { type: GET_CURRENTUSER_REQUEST }
}

export const getCurrentUserSuccess = function(payload) {
  return { type: GET_CURRENTUSER_SUCCESS, payload }
}

export const getCurrentUserFailed = function(payload) {
  return { type: GET_CURRENTUSER_FAILED, payload }
}

export const postLoginRequest = function(payload) {
  return { type: POST_LOGIN_REQUEST, payload }
}

export const postLoginSuccess = function(payload) {
  return { type: POST_LOGIN_SUCCESS, payload }
}

export const postLoginFailed = function(payload) {
  return { type: POST_LOGIN_FAILED, payload }
}

export const postLogoutRequest = function() {
  return { type: POST_LOGOUT_REQUEST }
}

export const postLogoutSuccess = function() {
  return { type: POST_LOGOUT_SUCCESS }
}

export const postLogoutFailed = function() {
  return { type: POST_LOGOUT_FAILED }
}

export const postSignUpRequest = function(payload) {
  return { type: POST_SIGNUP_REQUEST, payload }
}

export const postSignUpSuccess = function(payload) {
  return { type: POST_SIGNUP_SUCCESS, payload }
}

export const postSignUpFailed = function(payload) {
  return { type: POST_SIGNUP_FAILED, payload }
}

export const postUploadRequest = function(payload) {
  return { type: POST_UPLOAD_REQUEST, payload }
}

export const postUploadSuccess = function(payload) {
  return { type: POST_UPLOAD_SUCCESS, payload }
}

export const postUploadFailed = function(payload) {
  return { type: POST_UPLOAD_FAILED, payload }
}

export const fetchRequest = function(payload) {
  return { type: FETCH_REQUEST, payload }
}

export const fetchSuccess = function() {
  return { type: FETCH_SUCCESS }
}

export const fetchFailed = function() {
  return { type: FETCH_FAILED }
}

export const getUserInfoRequest = function() {
  return { type: GET_USERINFO_REQUEST }
}

export const getUserInfoSuccess = function(payload) {
  return { type: GET_USERINFO_SUCCESS, payload }
}

export const getUserInfoFailed = function(payload) {
  return { type: GET_USERINFO_FAILED, payload }
}

export const putUserInfoRequest = function(payload) {
  return { type: PUT_USERINFO_REQUEST, payload }
}

export const putUserInfoSuccess = function(payload) {
  return { type: PUT_USERINFO_SUCCESS, payload }
}

export const putUserInfoFailed = function(payload) {
  return { type: PUT_USERINFO_FAILED, payload }
}

export const postTeamsRequest = function(payload) {
  return { type: POST_TEAMS_REQUEST, payload }
}

export const postTeamsSuccess = function(payload) {
  return { type: POST_TEAMS_SUCCESS, payload }
}

export const postTeamsFailed = function(payload) {
  return { type: POST_TEAMS_FAILED, payload }
}

export const putTeamsRequest = function(payload) {
  return { type: PUT_TEAMS_REQUEST, payload }
}

export const putTeamsSuccess = function(payload) {
  return { type: PUT_TEAMS_SUCCESS, payload }
}

export const putTeamsFailed = function(payload) {
  return { type: PUT_TEAMS_FAILED, payload }
}

export const getMyTeamsRequest = function() {
  return { type: GET_MY_TEAMS_REQUEST }
}

export const getMyTeamsSuccess = function(payload) {
  return { type: GET_MY_TEAMS_SUCCESS, payload }
}

export const getMyTeamsFailed = function(payload) {
  return { type: GET_MY_TEAMS_FAILED, payload }
}

export const getInTeamsRequest = function() {
  return { type: GET_IN_TEAMS_REQUEST }
}

export const getInTeamsSuccess = function(payload) {
  return { type: GET_IN_TEAMS_SUCCESS, payload }
}

export const getInTeamsFailed = function(payload) {
  return { type: GET_IN_TEAMS_FAILED, payload }
}

export const deleteTeamMemberRequest = function(payload) {
  return { type: DELETE_TEAM_MEMBER_REQUEST, payload }
}

export const deleteTeamMemberSuccess = function(payload) {
  return { type: DELETE_TEAM_MEMBER_SUCCESS, payload }
}

export const deleteTeamMemberFailed = function(payload) {
  return { type: DELETE_TEAM_MEMBER_FAILED, payload }
}

export const deleteTeamRequest = function(payload) {
  return { type: DELETE_TEAM_REQUEST, payload }
}

export const deleteTeamSuccess = function(payload) {
  return { type: DELETE_TEAM_SUCCESS, payload }
}

export const deleteTeamFailed = function(payload) {
  return { type: DELETE_TEAM_FAILED, payload }
}

export const getHomeUserInfoDetailRequest = function(payload) {
  return { type: GET_HOME_USERINFO_DETAIL_REQUEST, payload }
}

export const getHomeUserInfoDetailSuccess = function(payload) {
  return { type: GET_HOME_USERINFO_DETAIL_SUCCESS, payload }
}

export const getHomeUserInfoDetailFailed = function(payload) {
  return { type: GET_HOME_USERINFO_DETAIL_FAILED, payload }
}

export const getHomeUserInfoListRequest = function(payload) {
  return { type: GET_HOME_USERINFO_LIST_REQUEST, payload }
}

export const getHomeUserInfoListSuccess = function(payload) {
  return { type: GET_HOME_USERINFO_LIST_SUCCESS, payload }
}

export const getHomeUserInfoListFailed = function(payload) {
  return { type: GET_HOME_USERINFO_LIST_FAILED, payload }
}

export const getHomeTeamDetailRequest = function(payload) {
  return { type: GET_HOME_TEAM_DETAIL_REQUEST, payload }
}

export const getHomeTeamDetailSuccess = function(payload) {
  return { type: GET_HOME_TEAM_DETAIL_SUCCESS, payload }
}

export const getHomeTeamDetailFailed = function(payload) {
  return { type: GET_HOME_TEAM_DETAIL_FAILED, payload }
}

export const getHomeTeamListRequest = function(payload) {
  return { type: GET_HOME_TEAM_LIST_REQUEST, payload }
}

export const getHomeTeamListSuccess = function(payload) {
  return { type: GET_HOME_TEAM_LIST_SUCCESS, payload }
}

export const getHomeTeamListFailed = function(payload) {
  return { type: GET_HOME_TEAM_LIST_FAILED, payload }
}

export const getHomeRecruitOrderListRequest = function(payload) {
  return { type: GET_HOME_RECRUIT_ORDER_LIST_REQUEST, payload }
}

export const getHomeRecruitOrderListSuccess = function(payload) {
  return { type: GET_HOME_RECRUIT_ORDER_LIST_SUCCESS, payload }
}

export const getHomeRecruitOrderListFailed = function(payload) {
  return { type: GET_HOME_RECRUIT_ORDER_LIST_FAILED, payload }
}

export const getAccountRecruitOrderListRequest = function(payload) {
  return { type: GET_ACCOUNT_RECRUIT_ORDER_LIST_REQUEST, payload }
}

export const getAccountRecruitOrderListSuccess = function(payload) {
  return { type: GET_ACCOUNT_RECRUIT_ORDER_LIST_SUCCESS, payload }
}

export const getAccountRecruitOrderListFailed = function(payload) {
  return { type: GET_ACCOUNT_RECRUIT_ORDER_LIST_FAILED, payload }
}

export const getRecruitOrderDetailRequest = function(payload) {
  return { type: GET_RECRUIT_ORDER_DETAIL_REQUEST, payload }
}

export const getRecruitOrderDetailSuccess = function(payload) {
  return { type: GET_RECRUIT_ORDER_DETAIL_SUCCESS, payload }
}

export const getRecruitOrderDetailFailed = function(payload) {
  return { type: GET_RECRUIT_ORDER_DETAIL_FAILED, payload }
}

export const postRecruitOrderRequest = function(payload) {
  return { type: POST_RECRUIT_ORDER_REQUEST, payload }
}

export const postRecruitOrderSuccess = function(payload) {
  return { type: POST_RECRUIT_ORDER_SUCCESS, payload }
}

export const postRecruitOrderFailed = function(payload) {
  return { type: POST_RECRUIT_ORDER_FAILED, payload }
}

export const putRecruitOrderRequest = function(payload) {
  return { type: PUT_RECRUIT_ORDER_REQUEST, payload }
}

export const putRecruitOrderSuccess = function(payload) {
  return { type: PUT_RECRUIT_ORDER_SUCCESS, payload }
}

export const putRecruitOrderFailed = function(payload) {
  return { type: PUT_RECRUIT_ORDER_FAILED, payload }
}

export const deleteRecruitOrderRequest = function(payload) {
  return { type: DELETE_RECRUIT_ORDER_REQUEST, payload }
}

export const deleteRecruitOrderSuccess = function(payload) {
  return { type: DELETE_RECRUIT_ORDER_SUCCESS, payload }
}

export const deleteRecruitOrderFailed = function(payload) {
  return { type: DELETE_RECRUIT_ORDER_FAILED, payload }
}

export const getHomeGroupOrderListRequest = function(payload) {
  return { type: GET_HOME_GROUP_ORDER_LIST_REQUEST, payload }
}

export const getHomeGroupOrderListSuccess = function(payload) {
  return { type: GET_HOME_GROUP_ORDER_LIST_SUCCESS, payload }
}

export const getHomeGroupOrderListFailed = function(payload) {
  return { type: GET_HOME_GROUP_ORDER_LIST_FAILED, payload }
}

export const getAccountGroupOrderListRequest = function(payload) {
  return { type: GET_ACCOUNT_GROUP_ORDER_LIST_REQUEST, payload }
}

export const getAccountGroupOrderListSuccess = function(payload) {
  return { type: GET_ACCOUNT_GROUP_ORDER_LIST_SUCCESS, payload }
}

export const getAccountGroupOrderListFailed = function(payload) {
  return { type: GET_ACCOUNT_GROUP_ORDER_LIST_FAILED, payload }
}

export const getGroupOrderDetailRequest = function(payload) {
  return { type: GET_GROUP_ORDER_DETAIL_REQUEST, payload }
}

export const getGroupOrderDetailSuccess = function(payload) {
  return { type: GET_GROUP_ORDER_DETAIL_SUCCESS, payload }
}

export const getGroupOrderDetailFailed = function(payload) {
  return { type: GET_GROUP_ORDER_DETAIL_FAILED, payload }
}

export const postGroupOrderRequest = function(payload) {
  return { type: POST_GROUP_ORDER_REQUEST, payload }
}

export const postGroupOrderSuccess = function(payload) {
  return { type: POST_GROUP_ORDER_SUCCESS, payload }
}

export const postGroupOrderFailed = function(payload) {
  return { type: POST_GROUP_ORDER_FAILED, payload }
}

export const putGroupOrderRequest = function(payload) {
  return { type: PUT_GROUP_ORDER_REQUEST, payload }
}

export const putGroupOrderSuccess = function(payload) {
  return { type: PUT_GROUP_ORDER_SUCCESS, payload }
}

export const putGroupOrderFailed = function(payload) {
  return { type: PUT_GROUP_ORDER_FAILED, payload }
}

export const deleteGroupOrderRequest = function(payload) {
  return { type: DELETE_GROUP_ORDER_REQUEST, payload }
}

export const deleteGroupOrderSuccess = function(payload) {
  return { type: DELETE_GROUP_ORDER_SUCCESS, payload }
}

export const deleteGroupOrderFailed = function(payload) {
  return { type: DELETE_GROUP_ORDER_FAILED, payload }
}

export const getHomeWarOrderListRequest = function(payload) {
  return { type: GET_HOME_WAR_ORDER_LIST_REQUEST, payload }
}

export const getHomeWarOrderListSuccess = function(payload) {
  return { type: GET_HOME_WAR_ORDER_LIST_SUCCESS, payload }
}

export const getHomeWarOrderListFailed = function(payload) {
  return { type: GET_HOME_WAR_ORDER_LIST_FAILED, payload }
}

export const getAccountWarOrderListRequest = function(payload) {
  return { type: GET_ACCOUNT_WAR_ORDER_LIST_REQUEST, payload }
}

export const getAccountWarOrderListSuccess = function(payload) {
  return { type: GET_ACCOUNT_WAR_ORDER_LIST_SUCCESS, payload }
}

export const getAccountWarOrderListFailed = function(payload) {
  return { type: GET_ACCOUNT_WAR_ORDER_LIST_FAILED, payload }
}

export const getWarOrderDetailRequest = function(payload) {
  return { type: GET_WAR_ORDER_DETAIL_REQUEST, payload }
}

export const getWarOrderDetailSuccess = function(payload) {
  return { type: GET_WAR_ORDER_DETAIL_SUCCESS, payload }
}

export const getWarOrderDetailFailed = function(payload) {
  return { type: GET_WAR_ORDER_DETAIL_FAILED, payload }
}

export const postWarOrderRequest = function(payload) {
  return { type: POST_WAR_ORDER_REQUEST, payload }
}

export const postWarOrderSuccess = function(payload) {
  return { type: POST_WAR_ORDER_SUCCESS, payload }
}

export const postWarOrderFailed = function(payload) {
  return { type: POST_WAR_ORDER_FAILED, payload }
}

export const putWarOrderRequest = function(payload) {
  return { type: PUT_WAR_ORDER_REQUEST, payload }
}

export const putWarOrderSuccess = function(payload) {
  return { type: PUT_WAR_ORDER_SUCCESS, payload }
}

export const putWarOrderFailed = function(payload) {
  return { type: PUT_WAR_ORDER_FAILED, payload }
}

export const deleteWarOrderRequest = function(payload) {
  return { type: DELETE_WAR_ORDER_REQUEST, payload }
}

export const deleteWarOrderSuccess = function(payload) {
  return { type: DELETE_WAR_ORDER_SUCCESS, payload }
}

export const deleteWarOrderFailed = function(payload) {
  return { type: DELETE_WAR_ORDER_FAILED, payload }
}


export const getHomeResumeOrderListRequest = function(payload) {
  return { type: GET_HOME_RESUME_ORDER_LIST_REQUEST, payload }
}

export const getHomeResumeOrderListSuccess = function(payload) {
  return { type: GET_HOME_RESUME_ORDER_LIST_SUCCESS, payload }
}

export const getHomeResumeOrderListFailed = function(payload) {
  return { type: GET_HOME_RESUME_ORDER_LIST_FAILED, payload }
}

export const getAccountResumeOrderListRequest = function(payload) {
  return { type: GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST, payload }
}

export const getAccountResumeOrderListSuccess = function(payload) {
  return { type: GET_ACCOUNT_RESUME_ORDER_LIST_SUCCESS, payload }
}

export const getAccountResumeOrderListFailed = function(payload) {
  return { type: GET_ACCOUNT_RESUME_ORDER_LIST_FAILED, payload }
}

export const getResumeOrderDetailRequest = function(payload) {
  return { type: GET_RESUME_ORDER_DETAIL_REQUEST, payload }
}

export const getResumeOrderDetailSuccess = function(payload) {
  return { type: GET_RESUME_ORDER_DETAIL_SUCCESS, payload }
}

export const getResumeOrderDetailFailed = function(payload) {
  return { type: GET_RESUME_ORDER_DETAIL_FAILED, payload }
}

export const postResumeOrderRequest = function(payload) {
  return { type: POST_RESUME_ORDER_REQUEST, payload }
}

export const postResumeOrderSuccess = function(payload) {
  return { type: POST_RESUME_ORDER_SUCCESS, payload }
}

export const postResumeOrderFailed = function(payload) {
  return { type: POST_RESUME_ORDER_FAILED, payload }
}

export const putResumeOrderRequest = function(payload) {
  return { type: PUT_RESUME_ORDER_REQUEST, payload }
}

export const putResumeOrderSuccess = function(payload) {
  return { type: PUT_RESUME_ORDER_SUCCESS, payload }
}

export const putResumeOrderFailed = function(payload) {
  return { type: PUT_RESUME_ORDER_FAILED, payload }
}

export const deleteResumeOrderRequest = function(payload) {
  return { type: DELETE_RESUME_ORDER_REQUEST, payload }
}

export const deleteResumeOrderSuccess = function(payload) {
  return { type: DELETE_RESUME_ORDER_SUCCESS, payload }
}

export const deleteResumeOrderFailed = function(payload) {
  return { type: DELETE_RESUME_ORDER_FAILED, payload }
}

export const sendEmailRequest = function(payload) {
  return { type: SEND_EMAIL_REQUEST, payload }
}

export const sendEmailSuccess = function(payload) {
  return { type: SEND_EMAIL_SUCCESS, payload }
}

export const sendEmailFailed = function(payload) {
  return { type: SEND_EMAIL_FAILED, payload }
}

export const sendPasswordResetRequest = function(payload) {
  return { type: SEND_PASSWORD_RESET_REQUEST, payload }
}

export const sendPasswordResetSuccess = function(payload) {
  return { type: SEND_PASSWORD_RESET_SUCCESS, payload }
}

export const sendPasswordResetFailed = function(payload) {
  return { type: SEND_PASSWORD_RESET_FAILED, payload }
}