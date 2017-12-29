import React, { PureComponent } from 'react'
import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { WhiteSpace } from 'antd-mobile'
import HomeRecruitCard from '../HomeRecruitCard'

export default class HomeRecruitOrderList extends PureComponent {
  constructor(props) {
    super(props)
    this._onEndReached = this._onEndReached.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._renderFonter = this._renderFonter.bind(this)
    this._renderSeparator = this._renderSeparator.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  _onEndReached() {
    if (
      this.props.recruitOrder.isFetching ||
      !this.props.recruitOrder.isLoadMore
    ) {
      return
    }
    const page = this.props.recruitOrder.page + 1
    this.props.getHomeRecruitOrderList({ page: page })
  }

  _onRefresh() {
    this.props.getHomeRecruitOrderList({ isRefreshing: true })
  }

  _renderFonter() {
    return (
      <View style={{ padding: 5 }}>
        <Text style={{ textAlign: 'center' }}>
          {this.props.recruitOrder.isFetching ? '' : '到底了'}
        </Text>
      </View>
    )
  }

  _renderItem({ item }) {
    return <HomeRecruitCard item={item} navigateTo={this.props.navigateTo} />
  }

  _renderSeparator() {
    return <WhiteSpace size="xs" />
  }

  _getItemLayout(data, index) {
    let [length, separator, header] = [197, 3, 0]
    return { length, offset: (length + separator) * index + header, index }
  }

  _keyExtractor = (item, index) => item.objectId

  render() {
    const {
      list,
      isRefreshing,
      fetchingText,
      isFetching
    } = this.props.recruitOrder
    return (
      <FlatList
        data={list}
        ListFooterComponent={this._renderFonter}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={this._renderItem}
        initialNumToRender={4}
        initialScrollIndex={0}
        maxToRenderPerBatch={20}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={this._onRefresh}
        keyExtractor={this._keyExtractor}
        getItemLayout={this._getItemLayout}
        refreshing={isRefreshing}
      />
    )
  }
}

HomeRecruitOrderList.propTypes = {
  recruitOrder: PropTypes.object,
  navigateTo: PropTypes.func,
  getHomeRecruitOrderList: PropTypes.func
}
