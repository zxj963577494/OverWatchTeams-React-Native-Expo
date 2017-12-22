import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  List,
  Toast
} from 'antd-mobile'
import _ from 'lodash'
import { setNavBar, sendEmailRequest } from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { userService } from '../../../services/leanclound'

class AccountEmaiVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerify: props.user.emailVerified,
      email: props.user.email,
      pending: props.app.isFetching
    }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onEmailChange(value) {
    this.setState({
      email: value
    })
  }

  onSubmit() {
    const { sendEmail, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        sendEmail({
          email: this.state.email
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {}

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app, pending, user } = this.props
    const { email, isVerify } = this.state
    const emailErrors = getFieldError('email')
    const VerifyMessage = user.emailVerified ? '已验证' : '未验证'
    return (
      <View>
        <List
          renderHeader={() => (
            <Text
              style={{
                height: 50,
                color: 'red',
                lineHeight: 50,
                paddingLeft: 10
              }}
            >
              邮箱地址[{VerifyMessage}]
            </Text>
          )}
        >
          <InputItem
            {...getFieldProps('email', {
              onChange: this.onEmailChange,
              initialValue: this.state.email,
              rules: [
                {
                  type: 'email',
                  required: true,
                  min: 2,
                  max: 25,
                  message: '邮箱地址:6-25个字符'
                }
              ]
            })}
            placeholder="请输入邮箱地址"
            value={email}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {emailErrors ? emailErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List />
        <WhiteSpace />
        <WingBlank>
          <Button
            disabled={pending || isVerify}
            onClick={this.onSubmit}
            type="primary"
          >
            验 证
          </Button>
          <Flex className="error">
            <Flex.Item>
              <Text style={styles.error}>{app.emailError}</Text>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    user: state.user.account.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendEmail: payload => {
      dispatch(sendEmailRequest(payload))
    }
  }
}

AccountEmaiVerify.propTypes = {
  app: PropTypes.object,
  user: PropTypes.object,
  sendEmail: PropTypes.func,
  form: PropTypes.object
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountEmaiVerify)
)
