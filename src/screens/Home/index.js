import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Flex, WhiteSpace, Grid, List, ActivityIndicator } from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import {
  getHomeGroupOrderListRequest,
  getHomeRecruitOrderListRequest
} from '../../actions'
import { HomeGroupCard, HomeRecruitCard } from '../../components'
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
  static propTypes = {
    navigateTo: PropTypes.func,
    groupOrder: PropTypes.object,
    recruitOrder: PropTypes.object,
    getHomeGroupOrderList: PropTypes.func,
    getHomeRecruitOrderList: PropTypes.func
  }

  _onPressButton = path => e => {
    this.props.navigateTo(path)
  }

  componentDidMount() {
    if (this.props.groupOrder.list.length === 0) {
      this.props.getHomeGroupOrderList({ page: 1 })
    }
    if (this.props.recruitOrder.list.length === 0) {
      this.props.getHomeRecruitOrderList({ page: 1 })
    }
  }

  render() {
    const { navigateTo, groupOrder, recruitOrder } = this.props
    return (
      <ScrollView>
        <ActivityIndicator
          toast
          text={groupOrder.fetchingText}
          animating={groupOrder.isFetching}
        />
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
              <TouchableWithoutFeedback
                onPress={this._onPressButton(dataItem.path)}
              >
                <View style={{ alignItems: 'center', marginTop: 15}}>
                  <Image
                    source={{ uri: dataItem.icon }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={{ marginTop: 8 }}>{dataItem.text}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
        <WhiteSpace size="md" />
        <List renderHeader={() => '组队上分'}>
          {groupOrder.list.slice(0, 3).map((item, index) => {
            return (
              <HomeGroupCard
                key={item.objectId}
                item={item}
                navigateTo={navigateTo}
              />
            )
          })}
        </List>
        <List renderHeader={() => '战队招募'}>
          {recruitOrder.list.slice(0, 3).map((item, index) => {
            return (
              <HomeRecruitCard
                key={item.objectId}
                item={item}
                navigateTo={navigateTo}
              />
            )
          })}
        </List>
      </ScrollView>
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
  groupOrder: state.groupOrder.home.groupOrder,
  recruitOrder: state.recruitOrder.home.recruitOrder
})

const mapDispatchToProps = dispatch => ({
  getHomeGroupOrderList: payload => {
    dispatch(getHomeGroupOrderListRequest(payload))
  },
  getHomeRecruitOrderList: payload => {
    dispatch(getHomeRecruitOrderListRequest(payload))
  },
  navigateTo: (path, params) => {
    dispatch(NavigationActions.navigate({ routeName: path, params: params }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
