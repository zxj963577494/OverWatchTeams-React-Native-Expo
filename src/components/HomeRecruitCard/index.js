import React, { PureComponent } from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { Card, Flex, WhiteSpace } from 'antd-mobile'
import TimeAgo from 'react-native-timeago'

import { cutstr } from '../../utils/utils'

export default class HomeRecruitCard extends PureComponent {
  render() {
    const { item, navigateTo } = this.props
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigateTo('HomeTeamDetail', {
            objectId: item.team.objectId
          })
        }
      >
        <View>
          <Card full>
            <Card.Header
              title={item.title}
              thumb={item.team.avatar}
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
      </TouchableWithoutFeedback>
    )
  }
}

HomeRecruitCard.propTypes = {
  navigateTo: PropTypes.func,
  item: PropTypes.object
}
