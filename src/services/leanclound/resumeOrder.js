import AV from 'leancloud-storage'
import { getCurrentUserAsync } from './user'
import { getDayStart, getDayEnd } from '../../utils/utils'

export function cerateResumeOrder(payload, userinfo, currentUser) {
  const resumeOrders = new AV.Object('ResumeOrders')
  resumeOrders.set('title', payload.title)
  resumeOrders.set('description', payload.description)
  resumeOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  resumeOrders.set('endDate', endDate)
  resumeOrders.set('user', currentUser)
  resumeOrders.set('stick', 0)
  resumeOrders.set('show', 1)

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(currentUser, true)

  resumeOrders.setACL(acl)

  return resumeOrders.save().then(function(result) {
    return { ...result.toJSON(), userinfo }
  })
}

export function updateResumeOrder(payload, userinfo) {
  const resumeOrders = AV.Object.createWithoutData(
    'ResumeOrders',
    payload.objectId
  )
  resumeOrders.set('title', payload.title)
  resumeOrders.set('description', payload.description)
  resumeOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  resumeOrders.set('endDate', endDate)

  return resumeOrders.save().then(function(result) {
    return {
      ...result.toJSON(),
      user: { userinfo }
    }
  })
}

export function removeResumeOrder(payload) {
  var resumeOrders = AV.Object.createWithoutData(
    'ResumeOrders',
    payload.objectId
  )
  return resumeOrders.destroy().then(function(success) {
    return success.toJSON()
  })
}

export function getAccountResumeOrderList(payload, currentUser) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('ResumeOrders')
  query.descending('updatedAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.equalTo('user', currentUser)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.include('user.userinfo')
  return query.find().then(function(result) {
    result.forEach(item => {
      list.push(item.toJSON())
    })
    return list
  })
}

export function getHomeResumeOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('ResumeOrders')
  query.equalTo('show', 1)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.descending('stick')
  query.descending('createdAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.include('user.userinfo')
  return query.find().then(function(result) {
    result.forEach(item => {
      list.push(item.toJSON())
    })
    return list
  })
}

export function getResumeOrderCountOfToday(currentUser) {
  const query = new AV.Query('ResumeOrders')
  query.equalTo('user', currentUser)
  query.lessThanOrEqualTo('createdAt', getDayEnd())
  query.greaterThanOrEqualTo('createdAt', getDayStart())
  return query.count().then(function(result) {
    return result
  })
}
