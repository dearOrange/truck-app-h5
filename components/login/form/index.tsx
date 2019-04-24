import React, { Component, PureComponent } from 'react'
import { createForm } from 'rc-form'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import Input from '@components/common/input'
import SmsInput from '@components/common/sms-input'
import PwdInput from '@components/common/pwd-input'
import Button from '@components/common/button'
import AUTH from '@constant/auth'
import LOGIN_TYPE from '@constant/login'

import { authLogin, updateAuthStatus } from '@store/actions/auth'

import Style from './index.scss'

interface Props {
  form?: any
  login?: any
  loginStatus?: any
  initStatus?: any
  type: LOGIN_TYPE
}

interface AccountLoginDataType {
  userAccount?: string
  userPassword?: string
}

interface SMSLoginDataType {
  mobileNumber?: string
  code?: string
}

type LoginDataType = AccountLoginDataType | SMSLoginDataType

const __first__ = Symbol('__first__')

class Form extends Component<Props, any> {
  static [__first__] = true

  private get _btnTexxt(): string {
    let text = '登录'
    let loginStatus = this.props.loginStatus

    if (loginStatus === AUTH.LOGINING) {
      text = `正在${text}中`
    }
    return text
  }

  private get _isLogining(): boolean {
    return AUTH.LOGINING === this.props.loginStatus
  }

  loginData: LoginDataType = {}

  state = {
    invalid: true
  }

  constructor(props: Props) {
    super(props)
    this.switch()
    this.props.initStatus && this.props.initStatus()
    Form[__first__] = true
  }

  private switch() {
    let { type: loginType } = this.props
    if (loginType === LOGIN_TYPE.ACCOUNT) {
      this.loginData = {
        userAccount: '',
        userPassword: ''
      }
    } else {
      this.loginData = {
        mobileNumber: '',
        code: ''
      }
    }
  }

  private checkInvalid() {
    let invalid = Object.keys(this.loginData).some(key => {
      let bool = isEmpty(this.loginData[key])
      return bool
    })

    this.setState({ invalid })
  }

  private onChangeByKey = (key: string) => {
    return (value: any) => {
      this.loginData[key] = value
      this.checkInvalid()
    }
  }

  private submit: (this: void) => Promise<any> = async () => {
    if (this._isLogining) {
      return
    }

    let form = this.props.form
    let { error } = await form.validateFields()

    if (!error) {
      this.props.login({
        type: this.props.type,
        data: {
          ...this.loginData
        }
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Form[__first__]) {
      Form[__first__] = false
      return null
    }
    if (
      nextProps.loginStatus & AUTH.FINISH &&
      nextProps.loginStatus & AUTH.SUCCESS
    ) {
      nextProps.router.replace(
        nextProps.loginBefore
          ? { ...nextProps.loginBefore }
          : {
              pathname: '/home'
            }
      )
    }
    return null
  }

  componentDidUpdate(prevProps) {
    let { type: curType } = this.props
    let { type: prevType } = prevProps

    if (curType !== prevType) {
      this.switch()
    }
  }

  render() {
    let { getFieldProps, getFieldError } = this.props.form
    let { type: loginType } = this.props
    let { onChangeByKey } = this
    let errors: any

    return (
      <div className={Style.form}>
        {loginType === LOGIN_TYPE.ACCOUNT ? (
          <>
            <div className={Style.formInput}>
              <Input
                key="userAccount"
                label="账号"
                placeholder="请输入账号"
                {...getFieldProps('userAccount', {
                  onChange: onChangeByKey('userAccount'),
                  rules: [{ required: true, message: '登录账号不能为空' }]
                })}
              />
              {(errors = getFieldError('userAccount')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <PwdInput
                label="密码"
                placeholder="请输入新密码（最少8位，数字+字母）"
                {...getFieldProps('userPassword', {
                  onChange: onChangeByKey('userPassword'),
                  rules: [{ required: true, message: '密码不能为空' }]
                })}
              />
              {(errors = getFieldError('userPassword')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className={Style.formInput}>
              <Input
                key="mobileNumber"
                placeholder="请输入手机号"
                label="手机号"
                {...getFieldProps('mobileNumber', {
                  onChange: onChangeByKey('mobileNumber'),
                  rules: [{ required: true, message: '手机号不能为空' }]
                })}
              />
              {(errors = getFieldError('mobileNumber')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <SmsInput
                phone={(this.loginData as SMSLoginDataType).mobileNumber}
                sendType="validateByMobile"
                placeholder="请输入验证码"
                label="短信验证码"
                {...getFieldProps('code', {
                  onChange: onChangeByKey('code'),
                  rules: [{ required: true, message: '验证码不能为空' }]
                })}
              />
              {(errors = getFieldError('code')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
          </>
        )}

        <div>
          <Button
            disabled={this.state.invalid}
            label={this._btnTexxt}
            onClick={this.submit}
          />
        </div>
      </div>
    )
  }
}

export default connect<any, any, { type: LOGIN_TYPE }>(
  (state: any) => {
    let status = state.auth.status
    return {
      loginBefore: state.auth.before,
      loginStatus: status
    }
  },
  dispatch => {
    return {
      login(loginData) {
        dispatch(authLogin(loginData))
      },

      initStatus() {
        dispatch(updateAuthStatus(AUTH.UNLOGIN))
      }
    }
  }
)(withRouter(createForm()(Form)))
