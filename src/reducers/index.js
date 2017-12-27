import { userReducer } from './user'
import { appReducer } from './app'
import { navReducer } from './nav'
import { teamReducer } from './team'
import { recruitOrderReducer } from './recruitOrder'
import { groupOrderReducer } from './groupOrder'
import { warOrderReducer } from './warOrder'
import { resumeOrderReducer } from './resumeOrder'

export default {
  app: appReducer,
  nav: navReducer,
  user: userReducer,
  team: teamReducer,
  recruitOrder: recruitOrderReducer,
  groupOrder: groupOrderReducer,
  warOrder: warOrderReducer,
  resumeOrder: resumeOrderReducer
}