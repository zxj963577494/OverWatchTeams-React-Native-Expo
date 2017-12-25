import CardStyle from 'antd-mobile/lib/card/style/index.native'

export default {
  ...CardStyle,
  headerTitle: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerExtra: {
    flex: 1,
  },
  footerContent: {
    flex: 3
  },
  footerExtra: {
    flex: 1,
  }
}
