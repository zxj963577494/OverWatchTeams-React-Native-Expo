import React, { PureComponent } from 'react'
import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { WhiteSpace } from 'antd-mobile'
import AccountGroupCard from '../AccountGroupCard'

export default class AccountGroupOrderList extends PureComponent {
  constructor(props) {
    super(props)
    this._onEndReached = this._onEndReached.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._renderFonter = this._renderFonter.bind(this)
    this._renderSeparator = this._renderSeparator.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  _onEndReached() {
    if (this.props.groupOrder.isFetching || !this.props.groupOrder.isLoadMore) {
      return
    }
    const page = this.props.groupOrder.page + 1
    this.props.getAccountGroupOrderList({ page: page })
  }

  _onRefresh() {
    this.props.getAccountGroupOrderList({ isRefreshing: true })
  }

  _renderFonter() {
    return (
      <View style={{ padding: 5 }}>
        <Text style={{ textAlign: 'center' }}>
          {this.props.groupOrder.isFetching ? '' : '到底了'}
        </Text>
      </View>
    )
  }

  _renderItem({ item }) {
    return (
      <AccountGroupCard
        item={item}
        navigateTo={this.props.navigateTo}
        deleteGroupOrder={this.props.deleteGroupOrder}
      />
    )
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
    } = this.props.groupOrder
    return (
      <FlatList
        data={list}
        ListFooterComponent={this._renderFonter}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={this._renderItem}
        initialNumToRender={20}
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

AccountGroupOrderList.propTypes = {
  groupOrder: PropTypes.object,
  navigateTo: PropTypes.func,
  getAccountGroupOrderList: PropTypes.func,
  deleteGroupOrder: PropTypes.func
}
