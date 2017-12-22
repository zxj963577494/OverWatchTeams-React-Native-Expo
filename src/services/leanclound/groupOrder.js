import AV from 'leancloud-storage'
import { getCurrentUserAsync } from './user'
import { getDayStart, getDayEnd } from '../../utils/utils'

// 创建组队帖
export function cerateGroupOrder(payload, userinfo, currentUser) {
  const groupOrders = new AV.Object('GroupOrders')
  groupOrders.set('title', payload.title)
  groupOrders.set('description', payload.description)
  groupOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  groupOrders.set('endDate', endDate)
  groupOrders.set('user', currentUser)
  groupOrders.set('stick', 0)
  groupOrders.set('show', 1)
  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(currentUser, true)

  groupOrders.setACL(acl)

  return groupOrders.save().then(function(result) {
    return { ...result.toJSON(), userinfo }
  })
}

export function updateGroupOrder(payload, currentUser) {
  const recruitOrders = AV.Object.createWithoutData(
    'GroupOrders',
    payload.objectId
  )
  recruitOrders.set('title', payload.title)
  recruitOrders.set('description', payload.description)
  recruitOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  recruitOrders.set('endDate', endDate)
  recruitOrders.set('user', currentUser)

  return recruitOrders.save().then(function(result) {
    return {
      ...result.toJSON()
    }
  })
}

export function removeGroupOrder(payload) {
  var recruitOrders = AV.Object.createWithoutData(
    'GroupOrders',
    payload.objectId
  )
  return recruitOrders.destroy().then(function(success) {
    return success.toJSON()
  })
}

export function getAccountGroupOrderList(payload, currentUser) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('GroupOrders')
  query.equalTo('user', currentUser)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.descending('updatedAt')
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

export function getHomeGroupOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('GroupOrders')
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

export function getGroupOrderCountOfToday(payload, currentUser) {
  const query = new AV.Query('GroupOrders')
  query.equalTo('user', currentUser)
  query.lessThanOrEqualTo('createdAt', getDayEnd())
  query.greaterThanOrEqualTo('createdAt', getDayStart())
  return query.count().then(function(result) {
    return result
  })
}
