import ImagePickerStyle from 'antd-mobile/lib/image-picker/style/index.native'

export default {
  ...ImagePickerStyle,
  container: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  size: {
    width: 120,
    height: 120
  },
  closeWrap: {
    width: 24,
    height: 24,
    backgroundColor: '#999',
    borderRadius: 12,
    position: 'absolute',
    top: 6,
    right: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
}
