import React, { PureComponent } from 'react'
import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { WhiteSpace, ActivityIndicator } from 'antd-mobile'
import AccountResumeCard from '../AccountResumeCard'

export default class AccountResumeOrderList extends PureComponent {
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
      this.props.resumeOrder.isFetching ||
      !this.props.resumeOrder.isLoadMore
    ) {
      return
    }
    const page = this.props.resumeOrder.page + 1
    this.props.getAccountResumeOrderList({ page: page })
  }

  _onRefresh() {
    this.props.getAccountResumeOrderList({ isRefreshing: true })
  }

  _renderFonter() {
    return (
      <View style={{ padding: 5 }}>
        <Text style={{ textAlign: 'center' }}>
          {this.props.resumeOrder.isFetching ? '' : '到底了'}
        </Text>
      </View>
    )
  }

  _renderItem({ item }) {
    return (
      <AccountResumeCard
        item={item}
        navigateTo={this.props.navigateTo}
        deleteResumeOrder={this.props.deleteResumeOrder}
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
    } = this.props.resumeOrder
    return (
      <View>
        <ActivityIndicator toast text={fetchingText} animating={isFetching} />
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
      </View>
    )
  }
}

AccountResumeOrderList.propTypes = {
  resumeOrder: PropTypes.object,
  navigateTo: PropTypes.func,
  getAccountResumeOrderList: PropTypes.func,
  deleteResumeOrder: PropTypes.func
}
