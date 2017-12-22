import AV from 'leancloud-storage'
import { getCurrentUserAsync } from './user'
import { getDayStart, getDayEnd } from '../../utils/utils'

// 创建招募令
export function cerateRecruitOrder(payload, team, currentUser) {
  const teamData = AV.Object.createWithoutData('Teams', payload.teamid)
  const recruitOrders = new AV.Object('RecruitOrders')
  recruitOrders.set('title', payload.title)
  recruitOrders.set('description', payload.description)
  recruitOrders.set('contact', payload.contact)
  recruitOrders.set('stick', 0)
  recruitOrders.set('show', 1)
  const endDate = new Date(payload.endDate)
  recruitOrders.set('endDate', endDate)
  recruitOrders.set('user', currentUser)
  recruitOrders.set('team', teamData)

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(user, true)

  recruitOrders.setACL(acl)

  return recruitOrders.save().then(function(result) {
    return { ...result.toJSON(), team }
  })
}

export function updateRecruitOrder(payload, team, currentUser) {
  const recruitOrders = AV.Object.createWithoutData(
    'RecruitOrders',
    payload.objectId
  )
  recruitOrders.set('title', payload.title)
  recruitOrders.set('description', payload.description)
  recruitOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  recruitOrders.set('endDate', endDate)
  recruitOrders.set('user', currentUser)
  recruitOrders.set('team', team)

  return recruitOrders.save().then(function(result) {
    return {
      ...result.toJSON(),
      team: team.toJSON()
    }
  })
}

export function removeRecruitOrder(payload) {
  var recruitOrders = AV.Object.createWithoutData(
    'RecruitOrders',
    payload.objectId
  )
  return recruitOrders.destroy().then(function(success) {
    return success.toJSON()
  })
}

export function getAccountRecruitOrderList(payload, currentUser) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('RecruitOrders')
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

export function getHomeRecruitOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('RecruitOrders')
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

export function getRecruitOrderCountOfToday(payload, currentUser) {
  const query = new AV.Query('RecruitOrders')
  query.equalTo('user', currentUser)
  console.log(getDayEnd())
  console.log(getDayStart())
  query.lessThanOrEqualTo('createdAt', getDayEnd())
  query.greaterThanOrEqualTo('createdAt', getDayStart())
  return query.count().then(function(result) {
    return result
  })
}
