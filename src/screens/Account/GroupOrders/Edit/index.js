import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { NavigationActions } from 'react-navigation'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  List,
  TextareaItem,
  Toast,
  DatePicker,
} from 'antd-mobile'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { putGroupOrderRequest, getMyTeamsRequest } from '../../../../actions'

let date = new Date()
date.setDate(date.getDate() + 14)

class AccountGroupOrdersEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objectId: props.groupOrder.objectId,
      title: props.groupOrder.title,
      description: props.groupOrder.description,
      endDate: new Date(props.groupOrder.endDate),
      contact: props.groupOrder.contact
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onContactChange = this.onContactChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onTitleChange(value) {
    this.setState({
      title: value
    })
  }

  onDescriptionChange(value) {
    this.setState({
      description: value
    })
  }

  onContactChange(value) {
    this.setState({
      contact: value
    })
  }

  onSubmit() {
    const { putGroup, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        putGroup({
          objectId: this.state.objectId,
          contact: this.state.contact,
          title: this.state.title,
          description: this.state.description,
          endDate: this.state.endDate
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {}

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { pending, navigateTo } = this.props
    const { title, description, contact, endDate } = this.state
    const titleErrors = getFieldError('title')
    const descriptionErrors = getFieldError('description')
    const contactErrors = getFieldError('contact')
    const endDateErrors = getFieldError('endDate')
    return (
      <KeyboardAwareScrollView>
        <List renderHeader={() => '组队标题'}>
          <InputItem
            {...getFieldProps('title', {
              onChange: this.onTitleChange,
              initialValue: title,
              rules: [
                {
                  required: true,
                  min: 2,
                  max: 25,
                  message: '标题:2-25个字符'
                }
              ]
            })}
            placeholder="请输入组队标题"
            value={title}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {titleErrors ? titleErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List renderHeader={() => '组队内容'}>
          <TextareaItem
            {...getFieldProps('description', {
              onChange: this.onDescriptionChange,
              initialValue: description,
              rules: [
                {
                  type: 'string',
                  required: true,
                  min: 2,
                  max: 200,
                  message: '战队口号:2-400个字符'
                }
              ]
            })}
            rows={6}
            placeholder="请输入组队内容"
            value={description}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {descriptionErrors ? descriptionErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List renderHeader={() => '联系方式'}>
          <InputItem
            {...getFieldProps('contact', {
              onChange: this.onContactChange,
              initialValue: contact,
              rules: [
                {
                  type: 'string',
                  required: true,
                  min: 2,
                  max: 25,
                  message: '联系方式:2-25个字符'
                }
              ]
            })}
            placeholder="请输入联系方式"
            value={contact}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {contactErrors ? contactErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List renderHeader={() => '有效日期'}>
          <DatePicker
            {...getFieldProps('endDate', {
              initialValue: endDate,
              rules: [{ required: true, message: '必须选择一个日期' }]
            })}
            mode="date"
            title="选择日期"
            value={endDate}
            onChange={date => this.setState({ endDate: date })}
          >
            <List.Item arrow="horizontal">有效日期</List.Item>
          </DatePicker>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {endDateErrors ? endDateErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button disabled={pending} onClick={this.onSubmit} type="primary">
            保 存
          </Button>
        </WingBlank>
        <WhiteSpace size="lg" />
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userinfo: state.user.account.userinfo,
    pending: state.groupOrder.account.groupOrder.pending,
    groupOrder: state.groupOrder.account.groupOrder.list.filter(
      x => x.objectId === ownProps.navigation.state.params.objectId
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    putGroup: payload => {
      dispatch(putGroupOrderRequest(payload))
    },
    getMyTeams: () => {
      dispatch(getMyTeamsRequest())
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountGroupOrdersEdit.propTypes = {
  userinfo: PropTypes.object,
  groupOrder: PropTypes.object,
  putGroup: PropTypes.func,
  navigateTo: PropTypes.func,
  form: PropTypes.object
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountGroupOrdersEdit)
)
