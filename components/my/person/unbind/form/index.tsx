import React, { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { createForm, formShape } from 'rc-form'
import { isEmpty } from 'lodash'
import { Toast } from 'antd-mobile'

import Whitespace from '@components/common/whitespace'
import Input from '@components/common/input'
import SmsInput from '@components/common/sms-input'
import Button from '@components/common/button'
import { dephone } from '@utils/desensitive'
import { unbindPhone } from '@api/user'

import Style from './index.scss'

interface State {
  vcode: string
}

class Form extends Component<any, State> {
  private get _invalid(): boolean {
    let { vcode } = this.state
    return isEmpty(vcode)
  }

  static propTypes = {
    form: formShape
  }

  constructor(props: any) {
    super(props)

    this.state = {
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
      let { success } = await unbindPhone(this.props.phone, this.state.vcode)
      if (success) {
        Router.replace({
          pathname: '/my/person/rebind'
        })
      } else {
        Toast.fail('解绑失败')
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
            initValue={dephone(this.props.phone)}
            placeholder="请输入原手机号"
            readOnly={true}
          />
        </div>
        <Whitespace size={0.3} />
        <div className={Style.formInput}>
          <SmsInput
            phone={this.props.phone}
            sendType="validateByMobAndCode"
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
          <Button disabled={this._invalid} label="解绑" onClick={this.submit} />
        </div>
      </div>
    )
  }
}

export default connect((store: any) => {
  let user = store.user
  return {
    phone: user.mobileNumber
  }
})(createForm()(Form))
