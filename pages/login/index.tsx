import React, { Component } from 'react'

import Whitespace from '@components/common/whitespace'
import Header from '@components/login/right'
import Logo from '@components/auth/logo'
import From from '@components/login/form'
import Bottom from '@components/login/bottom'
import WeChat from '@components/login/wechat'

import LOGIN_TYPE from '@constant/login'
interface State {
  type: LOGIN_TYPE
}

class Login extends Component<any, State> {
  state = {
    type: LOGIN_TYPE.ACCOUNT
  }

  changeType = () => {
    this.setState((prevState: State) => {
      let { type: prevType } = prevState
      return {
        type:
          prevType === LOGIN_TYPE.ACCOUNT ? LOGIN_TYPE.SMS : LOGIN_TYPE.ACCOUNT
      }
    })
  }
  render() {
    let type: LOGIN_TYPE = this.state.type

    return (
      <>
        <Header title={'登录'} />
        <Logo />
        <From type={type} />
        <Bottom type={type} changeStyle={this.changeType} />
        <Whitespace size={0.8} />
        <WeChat />
        <Whitespace size={0.5} />
      </>
    )
  }
}

export default Login
