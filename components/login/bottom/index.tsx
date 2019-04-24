import React, { Component } from 'react'
import Link from 'next/link'
import Style from './index.scss'
import classnames from 'classnames'

import LOGIN_TYPE from '@constant/login'
interface Props {
  type: LOGIN_TYPE
  changeStyle: () => void
}

export default class Bottom extends Component<Props> {
  change = () => {
    this.props.changeStyle()
  }
  render() {
    const { type } = this.props
    return (
      <div className={classnames(Style.operations)}>
        <a>
          <span onClick={this.change}>
            {type === LOGIN_TYPE.ACCOUNT ? '手机号登录' : '账号登录'}
          </span>
        </a>
        {/* {type === 'sms' ? (
          <a>
            <span onClick={this.changePass}>账号密码登录</span>
          </a>
        ) : (
          <a>
            <span onClick={this.changePhone}>手机号登录</span>
          </a>
        )} */}
        <Link prefetch href="/forget">
          <a>
            <span>忘记密码?</span>
          </a>
        </Link>
      </div>
    )
  }
}
