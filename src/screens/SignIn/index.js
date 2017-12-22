import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  ActivityIndicator,
  Toast
} from 'antd-mobile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import { postLoginRequest } from '../../actions'
import { MyActivityIndicator } from '../../components'

class SignIn extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: (
      <Text
        onPress={() => {
          navigation.navigate('Account')
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
      username: 'zxjzxj',
      password: '654321'
    }
    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
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

  onSubmit = () => {
    const { postLogin, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        postLogin({
          username: this.state.username,
          password: this.state.password
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  onSignUp() {
    this.props.navigateTo('SignUp')
  }

  componentDidMount() {}

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app, user_home, goBack } = this.props
    const usernameErrors = getFieldError('username')
    const passwordErrors = getFieldError('password')
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <ActivityIndicator toast text={app.text} animating={app.isFetching} />
        <WhiteSpace />
        <View>
          <InputItem
            {...getFieldProps('username', {
              onChange: this.onUserNameChange,
              initialValue: this.state.username,
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
              initialValue: this.state.password,
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
          <WhiteSpace />
          <WingBlank>
            <Flex>
              <Flex.Item>
                <WingBlank>
                  <Button onClick={this.onSignUp} type="warning">
                    注 册
                  </Button>
                </WingBlank>
              </Flex.Item>
              <Flex.Item>
                <WingBlank>
                  <Button onClick={this.onSubmit} type="primary">
                    登 录
                  </Button>
                </WingBlank>
              </Flex.Item>
            </Flex>
          </WingBlank>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {user_home ? user_home.loginError : null}
              </Text>
            </Flex.Item>
          </Flex>
        </View>
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
    postLogin: payload => {
      dispatch(postLoginRequest(payload))
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    },
  }
}

SignIn.propTypes = {
  app: PropTypes.object,
  user_home: PropTypes.object,
  postLogin: PropTypes.func,
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
  createForm()(SignIn)
)
