import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { Toast } from 'antd-mobile'

import Input from '../input'

import { isPhone } from '@utils/is'
import * as AuthApi from '@api/auth'

import Style from './index.scss'

interface Props {
  phone: string
  sendType: AuthApi.sendCodeType
  inline?: boolean
}

export default class SmsInput extends Component<Props> {
  private count: number = 60
  private isBegin: boolean = false
  private timeId: any

  get text(): string {
    let defaultText = '获取验证码'
    let text = this.isBegin ? `${this.state.remind}秒后重新发送` : defaultText

    return text
  }

  state = {
    remind: this.count
  }

  constructor(props: any) {
    super(props)
  }

  componentWillUnmount() {
    this.timeId && window.clearTimeout(this.timeId)
  }

  private valid() {
    let { phone } = this.props
    if (isEmpty(phone)) {
      Toast.info('手机号不能为空')
      return false
    }
    if (!isPhone(phone)) {
      Toast.info('手机号格式不正确')
      return false
    }
    return true
  }
  private begin() {
    this.isBegin = true
    this.countdown()
  }
  private countdown = () => {
    this.timeId = window.setTimeout(() => {
      this.setState((prevState: any) => {
        let { remind } = prevState
        remind -= 1
        return {
          remind
        }
      })
      let { remind } = this.state
      if (remind === 0) {
        this.end()
        return
      }
      this.countdown()
    }, 1000)
  }

  end() {
    this.isBegin = false
    this.setState({
      remind: this.count
    })
  }

  start = () => {
    if (!this.isBegin && this.valid()) {
      this.begin()
      this.send()
    }
  }

  send = async () => {
    let { success } = await AuthApi.sendVCode(
      this.props.phone,
      this.props.sendType
    )
    if (success) {
      Toast.success('发送成功')
    } else {
      Toast.fail('发送失败')
    }
  }

  renderSendText = () => {
    return (
      <span className={Style.smsLabel} onClick={this.start}>
        {this.text}
      </span>
    )
  }

  render() {
    return (
      <div className={Style.sms}>
        <Input {...this.props} renderTail={this.renderSendText} />
      </div>
    )
  }
}
