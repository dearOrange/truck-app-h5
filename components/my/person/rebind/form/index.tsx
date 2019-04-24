import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createForm, formShape } from 'rc-form'
import { isEmpty } from 'lodash'
import { Toast } from 'antd-mobile'

import Whitespace from '@components/common/whitespace'
import Input from '@components/common/input'
import SmsInput from '@components/common/sms-input'
import Button from '@components/common/button'

import { requestAndUpdateAction } from '@store/actions/user'
import { rebindPhone } from '@api/user'

import Style from './index.scss'

interface State {
  phone: string
  vcode: string
}

class Form extends Component<any, State> {
  private get _invalid(): boolean {
    let { vcode, phone } = this.state
    return isEmpty(vcode) && isEmpty(phone)
  }

  static propTypes = {
    form: formShape
  }

  constructor(props: any) {
    super(props)

    this.state = {
      phone: '',
      vcode: ''
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
      let { phone, vcode } = this.state
      let { success } = await rebindPhone(phone, vcode)

      if (success) {
        this.props.updatePhone && this.props.updatePhone(phone)
      } else {
        Toast.fail('重新绑定失败')
      }
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
            inline
            label="手机号"
            placeholder="请输入新手机号"
            {...getFieldProps('phone', {
              onChange: onChangeByKey('phone'),
              rules: [{ required: true, message: '手机号不能为空' }]
            })}
          />
          {(errors = getFieldError('phone')) ? (
            <div className={Style.formError}>{errors.join(',')}</div>
          ) : null}
        </div>
        <Whitespace size={0.3} />
        <div className={Style.formInput}>
          <SmsInput
            phone={this.props.phone}
            sendType="replaceMobile"
            inline
            clearable={false}
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
        <Whitespace size={0.5} />
        <div>
          <Button disabled={this._invalid} label="保存" onClick={this.submit} />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => {
    return {
      updatePhone(phone: string) {
        dispatch(
          requestAndUpdateAction({
            name: phone,
            type: 'mobileNumber'
          })
        )
      }
    }
  }
)(createForm()(Form))
