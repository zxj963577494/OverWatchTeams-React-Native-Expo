import React, { PureComponent } from 'react'
import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { WhiteSpace } from 'antd-mobile'
import HomeWarCard from '../HomeWarCard'

export default class HomeWarOrderList extends PureComponent {
  constructor(props) {
    super(props)
    this._onEndReached = this._onEndReached.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._renderFonter = this._renderFonter.bind(this)
    this._renderSeparator = this._renderSeparator.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  _onEndReached() {
    if (this.props.warOrder.isFetching || !this.props.warOrder.isLoadMore) {
      return
    }
    const page = this.props.warOrder.page + 1
    this.props.getHomeWarOrderList({ page: page })
  }

  _onRefresh() {
    this.props.getHomeWarOrderList({ isRefreshing: true })
  }

  _renderFonter() {
    return (
      <View style={{ padding: 5 }}>
        <Text style={{ textAlign: 'center' }}>
          {this.props.warOrder.isFetching ? '' : '到底了'}
        </Text>
      </View>
    )
  }

  _renderItem({ item }) {
    return <HomeWarCard item={item} navigateTo={this.props.navigateTo} />
  }

  _renderSeparator() {
    return <WhiteSpace size="xs" />
  }

  _getItemLayout(data, index) {
    let [length, separator, header] = [200, 3, 0]
    return { length, offset: (length + separator) * index + header, index }
  }

  _keyExtractor = (item, index) => item.objectId

  render() {
    const { list, isRefreshing, fetchingText, isFetching } = this.props.warOrder
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
        refreshing={isRefreshing}
      />
    )
  }
}

HomeWarOrderList.propTypes = {
  warOrder: PropTypes.object,
  navigateTo: PropTypes.func,
  getHomeWarOrderList: PropTypes.func
}
