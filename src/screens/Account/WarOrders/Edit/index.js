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
  Radio,
} from 'antd-mobile'
import { putWarOrderRequest, getMyTeamsRequest } from '../../../../actions'

let date = new Date()
date.setDate(date.getDate() + 14)

class AccountWarOrdersEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objectId: props.warOrder.objectId,
      teamid: props.warOrder.team.objectId,
      title: props.warOrder.title,
      description: props.warOrder.description,
      endDate: new Date(props.warOrder.endDate),
      contact: props.warOrder.contact
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

  onTeamSelectedChange(value) {
    this.setState({
      teamid: value
    })
  }

  onSubmit() {
    const { putWar, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        if (this.state.teamid) {
          putWar({
            objectId: this.state.objectId,
            teamid: this.state.teamid,
            contact: this.state.contact,
            title: this.state.title,
            description: this.state.description,
            endDate: this.state.endDate
          })
        } else {
          Toast.fail('请选择战队', 1.5)
        }
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {
    if (this.props.teams.length === 0) {
      this.props.getMyTeams()
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { pending, teams, navigateTo } = this.props
    const { teamid, title, description, contact, endDate } = this.state
    const titleErrors = getFieldError('title')
    const descriptionErrors = getFieldError('description')
    const contactErrors = getFieldError('contact')
    const endDateErrors = getFieldError('endDate')
    return (
      <ScrollView>
        <List renderHeader={() => '招募令标题'}>
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
            placeholder="请输入招募令标题"
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
        <List renderHeader={() => '招募令内容'}>
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
            placeholder="请输入招募令内容"
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
        <List renderHeader={() => '选择战队'}>
          {teams.length > 0 ? (
            teams.map((item, index) => (
              <Radio.RadioItem
                key={index}
                onChange={() => this.onTeamSelectedChange(item.objectId)}
                checked={teamid === item.objectId}
              >
                {item.englishFullName ||
                  item.chineseFullName ||
                  item.englishName ||
                  item.chineseName}
              </Radio.RadioItem>
            ))
          ) : (
            <Button
              type="warning"
              onClick={() => navigateTo('AccountTeamsCreate')}
            >
              必须先创建战队，点击前往
            </Button>
          )}
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
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.team.account.team.myTeams,
    userinfo: state.user.account.userinfo,
    pending: state.warOrder.account.warOrder.pending,
    warOrder: state.warOrder.account.warOrder.list.filter(
      x => x.objectId === ownProps.navigation.state.params.objectId
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    putWar: payload => {
      dispatch(putWarOrderRequest(payload))
    },
    getMyTeams: () => {
      dispatch(getMyTeamsRequest())
    },
    navigateTo: (path, params) => {
      dispatch(NavigationActions.navigate({ routeName: path, params: params }))
    }
  }
}

AccountWarOrdersEdit.propTypes = {
  userinfo: PropTypes.object,
  warOrder: PropTypes.object,
  putWar: PropTypes.func,
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
  createForm()(AccountWarOrdersEdit)
)
