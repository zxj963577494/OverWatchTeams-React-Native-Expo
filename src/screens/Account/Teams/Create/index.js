import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  Switch,
  Radio,
  List,
  TextareaItem,
  ImagePicker,
  Toast,
} from 'antd-mobile'
import _ from 'lodash'
import { ImagePicker as ExpoImagePicker } from 'expo'
import { RANKS } from '../../../../constants'
import { postTeamsRequest, postUploadRequest } from '../../../../actions'
import { ImagePickerStyle } from '../../../../components/CustomStyles'

class AccountTeamsCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chineseFullName: '',
      englishFullName: '',
      chineseName: '',
      englishName: '',
      introduction: '',
      files: [],
      rank: 'top500',
      avatar: '',
      createDate: '',
      createCity: '',
      contact: '',
      honor: '',
      match: '',
      isRecruit: false,
      pending: false
    }
    this.onChineseNameChange = this.onChineseNameChange.bind(this)
    this.onChineseFullNameChange = this.onChineseFullNameChange.bind(this)
    this.onContactChange = this.onContactChange.bind(this)
    this.onIntroductionChange = this.onIntroductionChange.bind(this)
    this.onImagePickerChange = this.onImagePickerChange.bind(this)
    this.onMatchChange = this.onMatchChange.bind(this)
    this.onEnglishNameChange = this.onEnglishNameChange.bind(this)
    this.onEnglishFullNameChange = this.onEnglishFullNameChange.bind(this)
    this.onCreateCityChange = this.onCreateCityChange.bind(this)
    this.onHonorChange = this.onHonorChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onImagePickerChange(files, type, index) {
    this.setState({
      files
    })
  }

  onAddImageClick() {
    ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 0.5
    }).then(image => {
      const name = 'team_avatar_' + _.random(10000, 9999999)
      this.setState({
        files: this.state.files.concat([{
          url: image.uri,
          id: name
        }])
      })
      this.props.postUpload({ name, image })
    })
  }

  onChineseFullNameChange(value) {
    this.setState({
      chineseFullName: value
    })
  }

  onChineseNameChange(value) {
    this.setState({
      chineseName: value
    })
  }

  onContactChange(value) {
    this.setState({
      contact: value
    })
  }

  onIntroductionChange(value) {
    this.setState({
      introduction: value
    })
  }

  onMatchChange(value) {
    this.setState({
      match: value
    })
  }

  onEnglishNameChange(value) {
    this.setState({
      englishName: value
    })
  }

  onEnglishFullNameChange(value) {
    this.setState({
      englishFullName: value
    })
  }

  onCreateCityChange(value) {
    this.setState({
      createCity: value
    })
  }

  onRankChange(value) {
    this.setState({
      rank: value
    })
  }

  onHonorChange(value) {
    this.setState({
      honor: value
    })
  }

  onRecruitChange(value) {
    this.setState({
      isRecruit: value
    })
  }

  onSubmit() {
    const { app, postTeam, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        postTeam({
          chineseFullName: this.state.chineseFullName,
          englishFullName: this.state.englishFullName,
          chineseName: this.state.chineseName,
          englishName: this.state.englishName,
          introduction: this.state.introduction,
          rank: this.state.rank,
          avatar: app.file.url || this.state.avatar,
          createDate: this.state.createDate,
          createCity: this.state.createCity,
          contact: this.state.contact,
          honor: this.state.honor,
          match: this.state.match,
          isRecruit: this.state.isRecruit
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {}

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app } = this.props
    const { files, rank, pending, isRecruit } = this.state
    const chineseFullNameErrors = getFieldError('chineseFullName')
    const englishFullNameErrors = getFieldError('englishFullName')
    const chineseNameErrors = getFieldError('chineseName')
    const englishNameErrors = getFieldError('englishName')
    const introductionErrors = getFieldError('introduction')
    const createCityErrors = getFieldError('createCity')
    const contactErrors = getFieldError('contact')
    const honorErrors = getFieldError('honor')
    const matchErrors = getFieldError('match')
    return (
      <ScrollView>
        <List renderHeader={() => '上传Logo'}>
          <ImagePicker
            styles={ImagePickerStyle}
            files={files}
            onChange={this.onImagePickerChange}
            selectable={files.length < 1}
            onAddImageClick={this.onAddImageClick}
          />
        </List>
        <List renderHeader={() => '基本信息'}>
          <InputItem
            {...getFieldProps('chineseName', {
              onChange: this.onChineseNameChange,
              initialValue: this.state.chineseName,
              rules: [
                {
                  required: true,
                  min: 2,
                  max: 25,
                  message: '战队中文简称:2-25个字符'
                }
              ]
            })}
            placeholder="请输入战队中文简称"
            value={this.state.chineseName}
          >
            中文简称
          </InputItem>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {chineseNameErrors ? chineseNameErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
          <InputItem
            {...getFieldProps('chineseFullName', {
              onChange: this.onChineseFullNameChange,
              initialValue: this.state.chineseFullName,
              rules: [
                {
                  type: 'string',
                  min: 2,
                  max: 25,
                  message: '战队中文全称:2-25个字符'
                }
              ]
            })}
            placeholder="请输入战队中文全称"
            value={this.state.chineseFullName}
          >
            中文全称
          </InputItem>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {chineseFullNameErrors ? chineseFullNameErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
          <InputItem
            {...getFieldProps('englishName', {
              onChange: this.onEnglishNameChange,
              initialValue: this.state.englishName,
              rules: [
                {
                  type: 'string',
                  min: 2,
                  max: 25,
                  message: '战队英文简称:2-25个字符'
                }
              ]
            })}
            placeholder="请输入战队英文简称"
            value={this.state.englishName}
          >
            英文简称
          </InputItem>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {englishNameErrors ? englishNameErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
          <InputItem
            {...getFieldProps('englishFullName', {
              onChange: this.onEnglishFullNameChange,
              initialValue: this.state.englishFullName,
              rules: [
                {
                  type: 'string',
                  min: 2,
                  max: 25,
                  message: '战队英文全称:2-25个字符'
                }
              ]
            })}
            placeholder="请输入战队英文全称"
            value={this.state.englishFullName}
          >
            英文全称
          </InputItem>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {englishFullNameErrors ? englishFullNameErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
          <InputItem
            {...getFieldProps('contact', {
              onChange: this.onContactChange,
              initialValue: this.state.contact,
              rules: [
                {
                  type: 'string',
                  min: 2,
                  max: 25,
                  message: '联系方式:2-25个字符'
                }
              ]
            })}
            placeholder="请输入联系方式"
            value={this.state.contact}
          >
            联系方式
          </InputItem>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {contactErrors ? contactErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
          <InputItem
            {...getFieldProps('createCity', {
              onChange: this.onCreateCityChange,
              initialValue: this.state.createCity,
              rules: [
                {
                  type: 'string',
                  min: 2,
                  max: 25,
                  message: '战队地点:2-25个字符'
                }
              ]
            })}
            placeholder="请输入线上或线下城市"
            value={this.state.createCity}
          >
            战队地点
          </InputItem>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {createCityErrors ? createCityErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>

        <List renderHeader={() => '战队介绍'}>
          <TextareaItem
            {...getFieldProps('introduction', {
              onChange: this.onIntroductionChange,
              initialValue: this.state.introduction,
              rules: [
                {
                  min: 2,
                  max: 400,
                  message: '战队介绍:4-400个字符'
                }
              ]
            })}
            rows={6}
            labelNumber={5}
            placeholder="请输入战队介绍"
            value={this.state.introduction}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {introductionErrors ? introductionErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List renderHeader={() => '比赛经历'}>
          <TextareaItem
            {...getFieldProps('match', {
              onChange: this.onMatchChange,
              initialValue: this.state.match,
              rules: [
                {
                  min: 2,
                  max: 200,
                  message: '比赛经历:4-400个字符'
                }
              ]
            })}
            rows={6}
            labelNumber={5}
            placeholder="请输入战队比赛经历，包括OWOD、战队训练赛等其它任何比赛经历"
            value={this.state.match}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {matchErrors ? matchErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List renderHeader={() => '主要荣耀'}>
          <TextareaItem
            {...getFieldProps('honor', {
              onChange: this.onHonorChange,
              initialValue: this.state.honor,
              rules: [
                {
                  min: 2,
                  max: 400,
                  message: '主要荣耀:4-400个字符'
                }
              ]
            })}
            rows={3}
            labelNumber={5}
            placeholder="请输入主要荣耀"
            value={this.state.honor}
          />
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Text style={styles.error}>
                {honorErrors ? honorErrors.join(',') : null}
              </Text>
            </Flex.Item>
          </Flex>
        </List>
        <List renderHeader={() => '平均段位'}>
          {RANKS.map(i => (
            <Radio.RadioItem
              key={i.value}
              onChange={() => this.onRankChange(i.value)}
              checked={rank === i.value}
            >
              {`${i.label} (${i.score})`}
            </Radio.RadioItem>
          ))}
        </List>
        <List renderHeader={() => '是否招募队员'}>
          <List.Item
            extra={
              <Switch
                {...getFieldProps('isRecruit', {
                  initialValue: isRecruit,
                  valuePropName: 'checked'
                })}
                onChange={checked => {
                  this.onRecruitChange(checked)
                }}
              />
            }
          >
            是否招募队员
          </List.Item>
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
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postUpload: payload => {
      dispatch(postUploadRequest(payload))
    },
    postTeam: payload => {
      dispatch(postTeamsRequest(payload))
    }
  }
}

AccountTeamsCreate.propTypes = {
  app: PropTypes.object,
  postUpload: PropTypes.func,
  postTeam: PropTypes.func,
  form: PropTypes.object
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountTeamsCreate)
)
