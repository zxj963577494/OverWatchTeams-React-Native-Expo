import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Card, Flex, WhiteSpace, Button, Modal } from 'antd-mobile'
import TimeAgo from 'react-native-timeago'
import { cutstr } from '../../utils/utils'
import { CardStyle } from '../CustomStyles'

export default class AccountWarCard extends PureComponent {
  onRemove = objectId => e => {
    Modal.alert('警告', '是否删除该约战帖？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => this.props.deleteWarOrder({ objectId: objectId })
      }
    ])
  }

  render() {
    const { item, navigateTo } = this.props
    return (
      <View>
        <Card styles={CardStyle} full>
          <Card.Header
            title={item.title}
            thumb={item.team.avatar}
            thumbStyle={{
              height: 60,
              width: 60,
              borderRadius: 30,
              marginRight: 10
            }}
            extra={
              <View>
                <Button
                  style={{ height: 30, width: 60 }}
                  onClick={() => {
                    this.props.navigateTo('AccountWarOrdersEdit', {
                      objectId: item.objectId
                    })
                  }}
                  type="ghost"
                  size="small"
                  inline
                >
                  编辑
                </Button>
                <WhiteSpace size="xs" />
                <Button
                  style={{ height: 30, width: 60 }}
                  onClick={this.onRemove(item.objectId)}
                  type="warning"
                  size="small"
                  inline
                >
                  删除
                </Button>
              </View>
            }
          />
          <Card.Body>
            <Flex>
              <Flex.Item>
                <Text style={{ textAlign: 'center' }}>
                  {item.team.englishFullName ||
                    item.team.chineseFullName ||
                    item.team.englishName ||
                    item.team.chineseName}
                </Text>
              </Flex.Item>
              <Flex.Item>
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {item.contact}
                </Text>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex style={{ minHeight: 30 }}>
              <Flex.Item>
                <Text
                  style={{
                    textAlign: 'center'
                  }}
                >
                  {item.description}
                </Text>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <Text
                style={{
                  paddingLeft: 15,
                  paddingRight: 15
                }}
              >
                发布时间：<TimeAgo time={item.createdAt} />
              </Text>
            }
            extra={
              <Text style={{ color: 'red', textAlign: 'center' }}>
                有效日期：<TimeAgo time={item.endDate} />
              </Text>
            }
            style={{ paddingBottom: 5 }}
          />
        </Card>
      </View>
    )
  }
}

AccountWarCard.propTypes = {
  navigateTo: PropTypes.func,
  item: PropTypes.object,
  deleteWarOrder: PropTypes.func
}
