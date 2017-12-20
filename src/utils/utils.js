import config from '../config'

export function cutstr(str, len, flag) {
  var str_length = 0
  var str_cut = ''
  var str_len = str.length
  for (var i = 0; i < str_len; i++) {
    var a = str.charAt(i)
    str_length++
    if (escape(a).length > 4) {
      //中文字符的长度经编码之后大于4
      str_length++
    }
    str_cut = str_cut.concat(a)
    if (str_length >= len) {
      if (flag === 0) {
        str_cut = str_cut.concat('...')
      }
      return str_cut
    }
  }
  //如果给定字符串小于指定长度，则返回源字符串；
  if (str_length < len) {
    return str
  }
}

export function getNickName() {
  const nicks = [
    '末日铁拳',
    '源氏',
    '麦克雷',
    '法老之鹰',
    '死神',
    '士兵：76',
    '黑影',
    '堡垒',
    '半藏',
    '狂鼠',
    '美',
    '托比昂',
    '黑百合',
    'D.Va',
    '奥丽莎',
    '莱因哈特',
    '路霸',
    '温斯顿',
    '查莉娅',
    '安娜',
    '卢西奥',
    '天使',
    '莫伊拉',
    '秩序之光',
    '禅雅塔'
  ]
  const i = nicks[Math.floor(Math.random() * nicks.length)]
  return i
}

export function getAvatar() {
  const avatars = [
    'avatar/00007642.png',
    'avatar/00007643.png',
    'avatar/00007644.png',
    'avatar/00007647.png',
    'avatar/00007641.png',
    'avatar/00008056.png',
    'avatar/00007646.png',
    'avatar/00008057.png',
    'avatar/00007649.png',
    'avatar/00008058.png',
    'avatar/00007648.png',
    'avatar/00008059.png',
    'avatar/00008063.png',
    'avatar/00008060.png',
    'avatar/00008064.png',
    'avatar/00008062.png',
    'avatar/00007645.png',
    'avatar/00008067.png',
    'avatar/00008069.png',
    'avatar/00008065.png',
    'avatar/00008066.png',
    'avatar/00007174.png',
    'avatar/00008068.png',
    'avatar/00007176.png',
    'avatar/00007177.png',
    'avatar/00007179.png',
    'avatar/00007184.png',
    'avatar/00007181.png',
    'avatar/00007185.png',
    'avatar/00007186.png',
    'avatar/00007183.png',
    'avatar/00007180.png',
    'avatar/00007051.png',
    'avatar/00007052.png',
    'avatar/00007640.png',
    'avatar/00007152.png',
    'avatar/00007155.png',
    'avatar/00007188.png',
    'avatar/00007182.png',
    'avatar/00007154.png',
    'avatar/00007156.png',
    'avatar/00007157.png',
    'avatar/00007153.png',
    'avatar/00007158.png',
    'avatar/00007160.png',
    'avatar/00007159.png',
    'avatar/00007161.png',
    'avatar/00007162.png',
    'avatar/00007165.png',
    'avatar/00007166.png',
    'avatar/00007168.png',
    'avatar/00007164.png',
    'avatar/00007169.png',
    'avatar/00007170.png',
    'avatar/00007172.png',
    'avatar/0000764B.png',
    'avatar/0000764A.png',
    'avatar/0000764C.png',
    'avatar/0000805B.png',
    'avatar/00007171.png',
    'avatar/0000764D.png',
    'avatar/0000764E.png',
    'avatar/0000804C.png',
    'avatar/0000805A.png',
    'avatar/0000805C.png',
    'avatar/0000805D.png',
    'avatar/0000805E.png',
    'avatar/0000806A.png',
    'avatar/0000805F.png',
    'avatar/0000806B.png',
    'avatar/0000806C.png',
    'avatar/0000806D.png',
    'avatar/0000715A.png',
    'avatar/0000715B.png',
    'avatar/0000715D.png',
    'avatar/0000715E.png',
    'avatar/0000715C.png',
    'avatar/0000716B.png',
    'avatar/0000716A.png',
    'avatar/0000715F.png',
    'avatar/0000716F.png',
    'avatar/0000716C.png',
    'avatar/0000716D.png',
    'avatar/0000716E.png',
    'avatar/0000717B.png',
    'avatar/0000717E.png',
    'avatar/0000719A.png',
    'avatar/0000717A.png',
    'avatar/0000719B.png',
    'avatar/0000719E.png',
    'avatar/0000719F.png',
    'avatar/000071A0.png',
    'avatar/000051CC.png',
    'avatar/000071A1.png',
    'avatar/000071A4.png',
    'avatar/000071A7.png',
    'avatar/000071A5.png',
    'avatar/000071A6.png',
    'avatar/000071A9.png',
    'avatar/000071AA.png',
    'avatar/000071A8.png',
    'avatar/0000717C.png',
    'avatar/000071AC.png',
    'avatar/000071AB.png',
    'avatar/000071AE.png',
    'avatar/000071B0.png',
    'avatar/000071B1.png',
    'avatar/000071AF.png',
    'avatar/000071B2.png',
    'avatar/000071B3.png'
  ]
  const i = avatars[Math.floor(Math.random() * avatars.length)]
  return config.BASE_PIC_URL + '/' + i
}

export function getPosition(type) {
  if (type) {
    const positions = {
      DPS: config.BASE_PIC_URL + '/dps.png',
      Flex: config.BASE_PIC_URL + '/flex.png',
      Tank: config.BASE_PIC_URL + '/tank.png',
      Support: config.BASE_PIC_URL + '/support.png'
    }
    return positions[type]
  } else {
    return config.BASE_PIC_URL + '/position.png'
  }
}

export function getDayStart() {
  return new Date(new Date(new Date().toDateString()).getTime())
}

export function getDayEnd() {
  return new Date(new Date(new Date().toDateString()).getTime()+24*60*60*1000-1)
}