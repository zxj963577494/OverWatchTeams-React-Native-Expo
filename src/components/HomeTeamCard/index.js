import React, { PureComponent } from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { Card, Flex, WhiteSpace } from 'antd-mobile'
import TimeAgo from 'react-native-timeago'

import { CardStyle } from '../../components/CustomStyles'
import { cutstr } from '../../utils/utils'

export default class HomeTeamCard extends PureComponent {
  render() {
    const { item, navigateTo } = this.props
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigateTo('HomeTeamDetail', { objectId: item.objectId })
        }
      >
        <View>
          <Card styles={CardStyle} full>
            <Card.Header
              title={
                item.englishFullName ||
                item.chineseFullName ||
                item.englishName ||
                item.chineseName
              }
              thumb={item.avatar}
              thumbStyle={{
                height: 60,
                width: 60,
                borderRadius: 30,
                marginRight: 10
              }}
            />
            <Card.Body>
              <Flex>
                <Flex.Item>
                  <Text style={{ padding: 15 }}>
                    {cutstr(item.introduction, 400, 0)}
                  </Text>
                </Flex.Item>
              </Flex>
              {item.isRecruit ? (
                <View>
                  <Flex>
                    <Flex.Item>
                      {item.isRecruit ? (
                        <Text style={{ color: 'red', textAlign: 'center' }}>
                          正在招募
                        </Text>
                      ) : (
                        <Text>暂无招募</Text>
                      )}
                    </Flex.Item>
                  </Flex>
                  <WhiteSpace />
                  <Flex>
                    <Flex.Item>
                      <Text style={{ textAlign: 'center' }}>
                        联系方式：{item.contact ? item.contact : '暂无'}
                      </Text>
                    </Flex.Item>
                  </Flex>
                  <WhiteSpace />
                  <Flex>
                    <Flex.Item>
                      <Text style={{ textAlign: 'center' }}>
                        战队地点：{item.createCity ? item.createCity : '暂无'}
                      </Text>
                    </Flex.Item>
                  </Flex>
                </View>
              ) : null}
            </Card.Body>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

HomeTeamCard.propTypes = {
  navigateTo: PropTypes.func,
  item: PropTypes.object
}
