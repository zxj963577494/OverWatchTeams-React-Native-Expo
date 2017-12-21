import AV from 'leancloud-storage'
import moment from 'moment'
import app from './src'

require('moment/locale/zh-cn')
moment.locale('zh-cn')

const appId = 'Vvtn3QVyWcN9eVbuAT3wjMfG-9Nh9j0Va'
const appKey = 'P59gxu0DMT7GkFeP1VlJoVmp'
AV.init({ appId, appKey })

export default app
