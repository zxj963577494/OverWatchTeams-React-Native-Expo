import AV from 'leancloud-storage'
import { getCurrentUser } from './user'
import config from '../../config'

let members = [
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  }
]

// 创建战队
export function cerateTeam(payload) {
  const teams = new AV.Object('Teams')
  for (let key of Object.keys(payload)) {
    teams.set(key, payload[key])
  }
  // 默认不置顶
  teams.set('stick', 0)
  teams.set('show', 1)
  if (!payload['avatar']) {
    teams.set('avatar', config.BASE_PIC_URL + '/logo.png')
  }

  const user = getCurrentUser()

  const userTeamMap = new AV.Object('UserTeamMap')
  userTeamMap.set('user', user)
  userTeamMap.set('team', teams)
  userTeamMap.set('leader', true)

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(AV.User.current(), true)

  userTeamMap.setACL(acl)

  return userTeamMap.save().then(function(result) {
    return result.get('team').toJSON()
  })
}

// 1.获取我的战队
export function getMyTeams() {
  const user = getCurrentUser()
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('leader', true)
  query.descending('createdAt')
  query.include('team')
  let result = []
  return query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(item, i, a) {
      let teaminfo = item.get('team').toJSON()
      result.push(teaminfo)
    })
    return result
  })
}

// 1.获取我所在的战队
export function getInTeams() {
  const user = getCurrentUser()
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('leader', false)
  query.descending('createdAt')
  query.include('team')
  let result = []
  return query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(item, i, a) {
      let teaminfo = item.get('team').toJSON()
      result.push(teaminfo)
    })
    return result
  })
}

// 2.根据战队获取成员
export function getTeamResult(payload) {
  const promises = []
  payload.forEach(function(item) {
    promises.push(getUserInfoByTeam(item))
  })
  return Promise.all(promises).then(data => {
    return data
  })
}

// 3.获取队员信息
function getUserInfoByTeam(payload) {
  return new Promise(function(resolve) {
    const query = new AV.Query('UserTeamMap')
    const team = AV.Object.createWithoutData('Teams', payload.objectId)
    query.equalTo('team', team)
    query.include('user')
    query.include('user.userinfo')
    return query.find().then(function(UserTeamMap) {
      let s = Object.assign([], members)
      UserTeamMap.forEach(function(item, i, a) {
        const userid = item.get('user').id
        const userinfo = item
          .get('user')
          .get('userinfo')
          .toJSON()
        const result = {
          ...userinfo,
          userid: userid,
          leader: item.get('leader')
        }
        s.splice(i, 1, result)
      })
      payload = { ...payload, members: s }
      resolve(payload)
    })
  })
}

export function getTeam(payload) {
  const team = new AV.Query('Teams')
  team.equalTo('objectId', payload.teamid)
  return team.first().then(function(result) {
    return result
  })
}

export function getTeamToJson(payload) {
  const team = new AV.Query('Teams')
  team.equalTo('objectId', payload.teamid)
  return team.first().then(function(result) {
    return result.toJSON()
  })
}

// 更新战队
export function updateTeam(payload) {
  const team = AV.Object.createWithoutData('Teams', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      team.set(key, payload[key])
    }
  }
  if (!payload['avatar']) {
    team.set('avatar', config.BASE_DEFAULT_PIC_URL)
  }
  return team.save().then(function(result) {
    return result.toJSON()
  })
}

// 移除队员
export function removeMember(payload) {
  const { teamid, memberid } = payload
  // 当前登录用户
  // const currentUser = AV.User.current()
  // const user = AV.Object.createWithoutData('_User', currentUser.id)
  const team = AV.Object.createWithoutData('Teams', teamid)
  const member = AV.Object.createWithoutData('_User', memberid)
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', member)
  query.equalTo('team', team)
  return query.first().then(function(result) {
    if (!result.get('leader')) {
      return query.destroy().then(function(success) {
        return success.toJSON()
      })
    } else {
      throw new Error('无法删除战队创始人')
    }
  })
}

// 解散战队
export function removeTeam(payload) {
  const { teamid } = payload
  const currentUser = AV.User.current()
  const user = AV.Object.createWithoutData('_User', currentUser.id)
  const team = AV.Object.createWithoutData('Teams', teamid)
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('team', team)
  return query.first().then(function(UserTeamMap) {
    if (UserTeamMap.get('leader')) {
      const cql = 'delete from UserTeamMap where objectId=?'
      const pvalues = [UserTeamMap.id]
      return AV.Query.doCloudQuery(cql, pvalues).then(function(result) {
        return { objectId: teamid }
      })
    } else {
      throw new Error('您不是战队管理者，无法执行该操作')
    }
  })
}

// 获取战队列表
export function getHomeTeamsList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('Teams')
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

// 获取战队信息
export function getHomeTeamDetail(payload) {
  const { objectId } = payload
  const query = new AV.Query('Teams')
  return query.get(objectId).then(function(result) {
    return result.toJSON()
  })
  // const { objectId } = payload
  // const team = AV.Object.createWithoutData('Teams', objectId)
  // const query = new AV.Query('UserTeamMap')
  // query.equalTo('team', team)
  // query.descending('createdAt')
  // query.include('team')
  // query.include('user')
  // query.include('user.userinfo')
  // return query.first().then(function(UserTeamMap) {
  //   let teaminfo = UserTeamMap[0].get('team').toJSON()
  //   teaminfo = { ...teaminfo, members: members }
  //   UserTeamMap.forEach(function(item, i, a) {
  //     const userid = item.get('user').id
  //     const userinfo = item
  //       .get('user')
  //       .get('userinfo')
  //       .toJSON()
  //     const result = { ...userinfo, userid: userid, leader: item.get('leader') }
  //     teaminfo.members.splice(i, 1, result)
  //   })
  //   return teaminfo
  // })
}
