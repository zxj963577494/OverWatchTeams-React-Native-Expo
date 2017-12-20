import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Flex, WhiteSpace, Grid, List } from 'antd-mobile'
import EStyleSheet from 'react-native-extended-stylesheet'
import config from '../../config'

const data = [
  {
    url: '/home/resumeorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '寻找战队'
  },
  {
    url: '/home/recruitorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队招募'
  },
  {
    url: '/home/warorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '比赛约战'
  },
  {
    url: '/home/grouporders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '组队上分'
  },
  {
    url: '/home/teams',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队列表'
  },
  {
    url: '/home/userinfos',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '个人列表'
  }
]

export default class Home extends Component {
  render() {
    return (
      <View style={styles.header}>
        <WhiteSpace size="md" />
        <Flex direction="column">
          <Flex.Item>
            <Image
              source={{ uri: config.BASE_PIC_HOME_LOGO_URL }}
              style={{ height: 150, width: 300 }}
            />
          </Flex.Item>
        </Flex>
        <Flex justify="center">
          <Text>这个世界需要更多的英雄</Text>
        </Flex>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  header: {
    height: 200,
    backGroundColor: '#fff'
  }
}) 