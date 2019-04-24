import React, { Component } from 'react'

import { createForm } from 'rc-form'
import { isEmpty } from 'lodash'
import Button from '@components/common/button'
import Input from '@components/common/input'
import Radio from '@components/common/radio'

import Style from './index.scss'

interface Props {
  onSubmit: (data: any) => void
  form: any
}

interface State {
  contactName: string
  contactMobile: string
  contactContent?: string
  gender?: string
}

class Form extends Component<Props, State> {
  private get _invalid(): boolean {
    let { contactMobile, contactName } = this.state
    return isEmpty(contactMobile) || isEmpty(contactName)
  }

  state = {
    contactName: '',
    contactMobile: '',
    contactContent: '',
    gender: '1'
  }

  submit = () => {
    this.props.onSubmit({
      ...this.state,
      relatedDataType: 'SL',
      contactType: 'M'
    })
  }

  onChangeByKey = <K extends keyof State>(key: K) => {
    return (value: State[K]) => {
      this.setState({ [key]: value } as Pick<State, keyof State>)
    }
  }
  render() {
    let { getFieldProps, getFieldError } = this.props.form
    let errors
    return (
      <>
        <div className={Style.form}>
          <div className={Style.formInput}>
            <Input
              label="联系人"
              placeholder="请输入联系人"
              {...getFieldProps('contactName', {
                onChange: this.onChangeByKey('contactName'),
                rules: [{ required: true, message: '联系人不能为空' }]
              })}
            />
            {(errors = getFieldError('contactName')) ? (
              <div className={Style.formError}>{errors.join(',')}</div>
            ) : null}
          </div>

          <div className={Style.formInput}>
            <Input
              label="联系方式"
              placeholder="请输入联系方式"
              {...getFieldProps('contactMobile', {
                onChange: this.onChangeByKey('contactMobile'),
                rules: [{ required: true, message: '联系方式不能为空' }]
              })}
            />
            {(errors = getFieldError('contactMobile')) ? (
              <div className={Style.formError}>{errors.join(',')}</div>
            ) : null}
          </div>
          <div className={Style.formInput}>
            <Input
              label="意向"
              multiable
              placeholder="请输入意向内容"
              {...getFieldProps('contactContent', {
                onChange: this.onChangeByKey('contactContent')
              })}
            />
          </div>
          <div className={Style.formInput}>
            <Radio label="性别(可选)" horizontal>
              <Radio.Option
                label="先生"
                value="1"
                checked={this.state.gender === '1'}
                onChange={this.onChangeByKey('gender')}
              />
              <Radio.Option
                label="女士"
                value="2"
                checked={this.state.gender === '2'}
                onChange={this.onChangeByKey('gender')}
              />
            </Radio>
          </div>

          <div>
            <Button
              disabled={this._invalid}
              label="立即预约"
              onClick={this.submit}
            />
          </div>
        </div>
      </>
    )
  }
}

export default createForm()(Form)
