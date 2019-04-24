import React, { Component } from 'react'
import Style from './index.scss'
// import classnames from 'classnames'

import Input from '@components/common/input'
import SmsInput from '@components/common/sms-input'
import PwdInput from '@components/common/pwd-input'
import Button from '@components/common/button'

import { createForm, formShape } from 'rc-form'
import { isEmpty } from 'lodash'

interface State {
  phone: string
  vcode: string
  password: string
}

class Form extends Component<any, State> {
  private get _invalid(): boolean {
    let { phone, vcode, password } = this.state
    return isEmpty(phone) || isEmpty(vcode) || isEmpty(password)
  }

  static propTypes = {
    form: formShape
  }

  constructor(props: any) {
    super(props)

    this.state = {
      phone: '',
      vcode: '',
      password: ''
    }
  }

  onChangeByKey = <K extends keyof State>(key: K) => {
    return (value: State[K]) => {
      this.setState({ [key]: value } as Pick<State, keyof State>)
    }
  }

  submit: (this: void) => Promise<any> = async () => {
    let form = this.props.form
    let { error } = await form.validateFields()

    if (!error) {
      // TODO
      console.log('TODO 表单提交')
    }
  }

  render() {
    let { getFieldProps, getFieldError } = this.props.form
    let { onChangeByKey } = this
    let errors

    return (
      <div className={Style.form}>
        <div className={Style.formInput}>
          <Input
            label="手机号"
            placeholder="请输入手机号"
            {...getFieldProps('phone', {
              onChange: onChangeByKey('phone'),
              rules: [{ required: true, message: '手机号不能为空' }]
            })}
          />
          {(errors = getFieldError('phone')) ? (
            <div className={Style.formError}>{errors.join(',')}</div>
          ) : null}
        </div>
        <div className={Style.formInput}>
          <SmsInput
            phone={this.state.phone}
            sendType="registered"
            label="验证码"
            placeholder="请输入验证码"
            {...getFieldProps('vcode', {
              onChange: onChangeByKey('vcode'),
              rules: [{ required: true, message: '验证码不能为空' }]
            })}
          />
          {(errors = getFieldError('vcode')) ? (
            <div className={Style.formError}>{errors.join(',')}</div>
          ) : null}
        </div>
        <div className={Style.formInput}>
          <PwdInput
            label="密码"
            placeholder="请输入新密码（最少8位，数字+字母）"
            {...getFieldProps('password', {
              onChange: onChangeByKey('password'),
              rules: [{ required: true, message: '密码不能为空' }]
            })}
          />
          {(errors = getFieldError('password')) ? (
            <div className={Style.formError}>{errors.join(',')}</div>
          ) : null}
        </div>

        <div>
          <Button disabled={this._invalid} label="注册" onClick={this.submit} />
        </div>
      </div>
    )
  }
}

export default createForm()(Form)
