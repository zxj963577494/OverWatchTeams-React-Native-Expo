import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Flex, WhiteSpace, Grid, List } from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import config from '../../config'

const data = [
  {
    path: 'HomeResumeOrders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '寻找战队'
  },
  {
    path: 'HomeRecruitOrders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队招募'
  },
  {
    path: 'HomeWarOrders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '比赛约战'
  },
  {
    path: 'HomeGroupOrders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '组队上分'
  },
  {
    path: 'HomeTeams',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队列表'
  },
  {
    path: 'HomeUserInfos',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '个人列表'
  }
]

class Home extends Component {
  _onPressButton = path => e => {
    this.props.navigate(path)
  }

  render() {
    return (
      <View>
        <WhiteSpace size="md" />
        <View style={styles.headerer}>
          <Flex direction="column" justify="center">
            <Flex.Item>
              <Image
                source={{ uri: config.BASE_PIC_HOME_LOGO_URL }}
                style={{ height: 150, width: 300 }}
              />
              <Flex direction="column" justify="center">
                <Flex.Item>
                  <Text>这个世界需要更多的英雄</Text>
                </Flex.Item>
              </Flex>
            </Flex.Item>
          </Flex>
        </View>
        <WhiteSpace size="md" />
        <View style={styles.grid}>
          <Grid
            data={data}
            columnNum={3}
            hasLine={false}
            renderItem={dataItem => (
              <TouchableHighlight onPress={this._onPressButton(dataItem.path)}>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                  <Image
                    source={{ uri: dataItem.icon }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={{ marginTop: 8 }}>{dataItem.text}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
        <WhiteSpace size="md" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerer: {
    height: 180,
    backgroundColor: '#fff'
  },
  grid: {
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  navigate: (path) => {
    dispatch(NavigationActions.navigate({ routeName: path }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
