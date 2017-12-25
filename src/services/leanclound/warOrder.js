import AV from 'leancloud-storage'
import { getCurrentUserAsync } from './user'
import { getDayStart, getDayEnd } from '../../utils/utils'

// 创建战队训练赛约战
export function cerateWarOrder(payload, team, currentUser) {
  const teamData = AV.Object.createWithoutData('Teams', payload.teamid)
  const warOrders = new AV.Object('WarOrders')
  warOrders.set('title', payload.title)
  warOrders.set('description', payload.description)
  warOrders.set('contact', payload.contact)
  warOrders.set('stick', 0)
  warOrders.set('show', 1)
  const endDate = new Date(payload.endDate)
  warOrders.set('endDate', endDate)
  warOrders.set('user', currentUser)
  warOrders.set('team', teamData)

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(currentUser, true)
  warOrders.setACL(acl)

  return warOrders.save().then(function(result) {
    return {...result.toJSON(), team}
  })
}

export function updateWarOrder(payload, team, currentUser) {
  const warOrders = AV.Object.createWithoutData(
    'WarOrders',
    payload.objectId
  )
  warOrders.set('title', payload.title)
  warOrders.set('description', payload.description)
  warOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  warOrders.set('endDate', endDate)
  warOrders.set('user', currentUser)
  warOrders.set('team', team)

  return warOrders.save().then(function(result) {
    return {
      ...result.toJSON(),
      team: team.toJSON()
    }
  })
}

export function removeWarOrder(payload) {
  var warOrders = AV.Object.createWithoutData('WarOrders', payload.objectId)
  return warOrders.destroy().then(function(success) {
    return success.toJSON()
  })
}

export function getAccountWarOrderList(payload, currentUser) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('WarOrders')
  query.equalTo('user', currentUser)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.descending('updatedAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.include('team')
  return query.find().then(function(result) {
    result.forEach(item => {
      const team = item.get('team').toJSON()
      const res = { ...item.toJSON(), team }
      list.push(res)
    })
    return list
  })
}

export function getHomeWarOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('WarOrders')
  query.equalTo('show', 1)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.descending('stick')
  query.descending('createdAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.include('team')
  return query.find().then(function(result) {
    result.forEach(item => {
      const team = item.get('team').toJSON()
      const res = { ...item.toJSON(), team }
      list.push(res)
    })
    return list
  })
}

export function getWarOrderCountOfToday(currentUser) {
  const query = new AV.Query('WarOrders')
  query.equalTo('user', currentUser)
  query.lessThanOrEqualTo('createdAt', getDayEnd())
  query.greaterThanOrEqualTo('createdAt', getDayStart())
  return query.count().then(function(result) {
    return result
  })
}