import React, { PureComponent } from 'react'
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Card, Flex, WhiteSpace, Grid } from 'antd-mobile'
import TimeAgo from 'react-native-timeago'
import { RANKS, TEAMPOSITIONS } from '../../constants'

export default class HomeUserInfoCard extends PureComponent {
  layout = e => {
    console.log(e)
  }

  render() {
    const { item, navigateTo } = this.props
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigateTo('HomeUserDetail', {
            objectId: item.objectId
          })
        }
      >
        <View onLayout={({ nativeEvent: e }) => this.layout(e)}>
          <Card full>
            <Card.Header
              title={item.nickname}
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
                  <Text style={{ textAlign: 'center' }}>
                    天梯：{item.rankscore ? item.rankscore + '分' : '未知'}
                  </Text>
                </Flex.Item>
                <Flex.Item>
                  <Text style={{ textAlign: 'center' }}>
                    段位：{item.rank
                      ? RANKS.filter(x => x.value === item.rank)[0].label
                      : '未知'}
                  </Text>
                </Flex.Item>
                <Flex.Item>
                  <Text style={{ textAlign: 'center' }}>
                    位置：{item.position
                      ? TEAMPOSITIONS.filter(x => x.value === item.position)[0]
                          .label
                      : '未知'}
                  </Text>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              {item.heros ? (
                <Grid
                  data={item.heros}
                  columnNum={3}
                  hasLine={false}
                  renderItem={dataItem => (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={{ uri: dataItem.image }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                      />
                    </View>
                  )}
                />
              ) : (
                <WhiteSpace />
              )}
              <Flex>
                <Flex.Item>
                  <Text style={{ textAlign: 'center' }}>
                    {item.introduction}
                  </Text>
                </Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

HomeUserInfoCard.propTypes = {
  navigateTo: PropTypes.func,
  item: PropTypes.object
}
