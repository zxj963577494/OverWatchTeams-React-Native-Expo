import AV from 'leancloud-storage'

// 发送验证码
export function requestSmsCode(payload) {
  const { phone } = payload
  return AV.Cloud.requestSmsCode(phone).then(function(result) {
    return result.toJSON()
  })
}

// 验证邮箱
export function requestEmailVerify(payload) {
  const { email } = payload
  return AV.User.requestEmailVerify(email).then(function(result) {
    return result
  })
}

// 邮箱重置密码
export function requestPasswordReset(payload) {
  const { email } = payload
  return AV.User.requestPasswordReset(email).then(function(result) {
    return result
  })
}

// 手机号码重置密码, 发送验证码
export function requestPasswordResetBySmsCode(payload) {
  const { phone } = payload
  return AV.User.requestPasswordResetBySmsCode(phone)
}

// 手机号码重置密码
export function resetPasswordBySmsCode(payload) {
  const { code, password } = payload
  return AV.User.resetPasswordBySmsCode(code, password)
}

// 上传图片
export function uploadPic(payload) {
  const { localFile, name } = payload
  const file = new AV.File(name, { blob: localFile })
  console.warn(file)
  return file.save().then(function(result) {
    return result.toJSON()
  })
}
