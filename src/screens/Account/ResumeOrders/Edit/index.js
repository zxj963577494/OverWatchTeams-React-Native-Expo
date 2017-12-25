import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
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
  ActivityIndicator
} from 'antd-mobile'
import { putResumeOrderRequest, getMyTeamsRequest } from '../../../../actions'

let date = new Date()
date.setDate(date.getDate() + 14)

class AccountResumeOrdersEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objectId: props.resumeOrder.objectId,
      title: props.resumeOrder.title,
      description: props.resumeOrder.description,
      endDate: new Date(props.resumeOrder.endDate),
      contact: props.resumeOrder.contact
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
    const { putResume, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        putResume({
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
    const { app, pending, navigateTo } = this.props
    const { title, description, contact, endDate } = this.state
    const titleErrors = getFieldError('title')
    const descriptionErrors = getFieldError('description')
    const contactErrors = getFieldError('contact')
    const endDateErrors = getFieldError('endDate')
    return (
      <ScrollView>
        <ActivityIndicator toast text={app.text} animating={app.isFetching} />
        <List renderHeader={() => '自荐标题'}>
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
            placeholder="请输入自荐标题"
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
        <List renderHeader={() => '自荐内容'}>
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
            placeholder="请输入自荐内容"
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
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    userinfo: state.user.account.userinfo,
    pending: state.resumeOrder.account.resumeOrder.pending,
    resumeOrder: state.resumeOrder.account.resumeOrder.list.filter(
      x => x.objectId === ownProps.navigation.state.params.objectId
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    putResume: payload => {
      dispatch(putResumeOrderRequest(payload))
    },
    getMyTeams: () => {
      dispatch(getMyTeamsRequest())
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountResumeOrdersEdit.propTypes = {
  app: PropTypes.object,
  userinfo: PropTypes.object,
  resumeOrder: PropTypes.object,
  putResume: PropTypes.func,
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
  createForm()(AccountResumeOrdersEdit)
)
