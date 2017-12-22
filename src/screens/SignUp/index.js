import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  ActivityIndicator
} from 'antd-mobile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { postSignUpRequest } from '../../actions'

class SignUp extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: (
      <Text
        onPress={() => {
          navigation.navigate('SignIn')
        }}
        style={{ marginLeft: 5, width: 30, textAlign: 'center' }}
      >
        <Ionicons name="ios-arrow-back" size={24} />
      </Text>
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserNameChange(value) {
    this.setState({
      username: value
    })
  }

  onPasswordChange(value) {
    this.setState({
      password: value
    })
  }

  onEmailChange(value) {
    this.setState({
      email: value
    })
  }

  onSubmit = () => {
    const { postSignUp, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        postSignUp({
          username: this.state.username,
          password: this.state.password,
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
    const { app, user_home } = this.props
    const usernameErrors = getFieldError('username')
    const passwordErrors = getFieldError('password')
    const emailErrors = getFieldError('email')
    return (
      <View>
        <WhiteSpace />
        <ActivityIndicator toast text={app.text} animating={app.isFetching} />
        <InputItem
          {...getFieldProps('username', {
            onChange: this.onUserNameChange,
            rules: [
              {
                type: 'string',
                required: true,
                pattern: /\w{5,25}$/,
                message: '6-25个字符'
              }
            ]
          })}
          placeholder="请输入用户名"
          value={this.state.username}
        >
          <Text>用户名</Text>
        </InputItem>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <Text style={styles.error}>
              {usernameErrors ? usernameErrors.join(',') : null}
            </Text>
          </Flex.Item>
        </Flex>
        <InputItem
          type="password"
          {...getFieldProps('password', {
            onChange: this.onPasswordChange,
            rules: [
              {
                type: 'string',
                required: true,
                pattern: /\w{5,25}$/,
                message: '6-25个字符'
              }
            ]
          })}
          placeholder="请输入密码"
          value={this.state.password}
        >
          <Text>密码</Text>
        </InputItem>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <Text style={styles.error}>
              {passwordErrors ? passwordErrors.join(',') : null}
            </Text>
          </Flex.Item>
        </Flex>
        <InputItem
          type="email"
          {...getFieldProps('email', {
            onChange: this.onEmailChange,
            rules: [
              { type: 'email', required: true, message: '邮箱格式不正确' }
            ]
          })}
          placeholder="请输入邮箱地址"
          value={this.state.email}
        >
          <Text>邮箱</Text>
        </InputItem>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <Text style={styles.error}>
              {emailErrors ? emailErrors.join(',') : null}
            </Text>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.onSubmit} type="primary">
            注 册
          </Button>
        </WingBlank>
        <WhiteSpace />
        <Flex className="error">
          <Flex.Item>
            <Text style={styles.error}>
              {user_home ? user_home.signupError : null}
            </Text>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    user_home: state.user.home
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postSignUp: payload => {
      dispatch(postSignUpRequest(payload))
    }
  }
}

SignUp.propTypes = {
  app: PropTypes.object,
  user_home: PropTypes.object,
  postSignUp: PropTypes.func,
  form: PropTypes.object
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(SignUp)
)
