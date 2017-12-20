import AV from 'leancloud-storage'
import { getAvatar, getNickName } from '../../utils/utils'

// 用户名和密码注册
export function signUp(payload) {
  const { username, password, email } = payload
  const avatar = getAvatar()
  const nickname = getNickName()
  const user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  return user.signUp().then(function(loginedUser) {
    if (!loginedUser.get('userinfo')) {
      const Userinfo = AV.Object.extend('UserInfo')
      const userinfo = new Userinfo()
      userinfo.set('nickname', nickname)
      userinfo.set('contact', email)
      userinfo.set('avatar', avatar)
      userinfo.set('avatar', avatar)
      userinfo.set('isPublic', true)
      userinfo.set('show', 1)
      userinfo.set('stick', 0)
      userinfo.set('teamLimit', 1)
      userinfo.set('groupOrderLimit', 1)
      userinfo.set('recruitOrderLimit', 1)
      userinfo.set('resumeOrderLimit', 1)
      userinfo.set('warOrderLimit', 1)
      userinfo.set('introduction', '这个世界需要更多的英雄')
      loginedUser.set('userinfo', userinfo)
      return loginedUser.save().then(function(result) {
        return result.toJSON()
      })
    }
  })
}

// 手机号码注册
export function signUpBySmsCode(payload) {
  const { phone, code } = payload
  return AV.User.signUpOrlogInWithMobilePhone(phone, code)
}

// 第三方账号登录
export function signUpOrlogInWithAuthData(payload) {}

// 用户名和密码登录
export function logIn(payload) {
  const { username, password } = payload
  return AV.User.logIn(username, password).then(function(result) {
    return result.toJSON()
  })
}

// 手机号和密码登录
export function logInWithMobilePhone(payload) {
  const { phone, password } = payload
  return AV.User.logInWithMobilePhone(phone, password)
}

// 手机号和验证码登录
export function requestLoginSmsCode(payload) {
  const { phone, code } = payload
  return AV.User.logInWithMobilePhoneSmsCode(phone, code)
}

// 当前用户
export function getCurrentUser() {
  return AV.User.current()
}

// 验证 SessionToken 是否在有效期内
export function isAuthenticated() {
  var currentUser = AV.User.current()
  return currentUser.isAuthenticated()
}

// 使用 SessionToken 登录
// 登录后可以调用 user.getSessionToken() 方法得到当前登录用户的 sessionToken
export function logInWithSessionToken(payload) {
  const { sessionToken } = payload
  return AV.User.become(sessionToken)
}

// 登出
export function logOut() {
  return AV.User.logOut()
  // 现在的 currentUser 是 null 了
  // var currentUser = AV.User.current()
}

export function putUserInfo(payload) {
  const userinfo = AV.Object.createWithoutData('UserInfo', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      userinfo.set(key, payload[key])
    }
  }
  return userinfo.save().then(function(result) {
    return result.toJSON()
  })
}

export function getUserInfoToJson() {
  const current = AV.User.current()
  const user = new AV.Query('_User')
  user.equalTo('objectId', current.id)
  user.include('userinfo')
  return user.first().then(function(result) {
    return result.get('userinfo').toJSON()
  })
}

export function getHomeUserInfoList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('UserInfo')
  query.equalTo('isPublic', true)
  query.equalTo('show', 1)
  query.descending('stick')
  query.descending('createdAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  return query.find().then(function(result) {
    result.forEach(item => {
      list.push(item.toJSON())
    })
    return list
  })
}

export function getHomeUserInfoDetail(payload) {
  const { objectId } = payload
  const query = new AV.Query('UserInfo')
  query.equalTo('objectId', objectId)
  return query.first().then(function(result) {
    return result.toJSON()
  })
}
