import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Toast } from 'antd-mobile'

import AUTH from '@constant/auth'
import { authLogout } from '@store/actions/auth'

import Button from '@components/common/button'
class Logout extends Component<any> {
  logout = () => {
    this.props.doLogout && this.props.doLogout()
  }

  goLogin = () => {
    Router.push({
      pathname: '/login'
    })
  }

  goAfterLogout = () => {
    Router.push({
      pathname: '/home'
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { authStatus } = nextProps

    if (authStatus & AUTH.LOGOUTED) {
      if (authStatus & AUTH.SUCCESS) {
        Toast.success('注销成功!')
      } else if (authStatus & AUTH.ERROR) {
        Toast.success('注销成功!')
      }
    }
    return null
  }

  render() {
    return this.props.isLogged ? (
      <Button fullable label="退出登录" theme="primary" onClick={this.logout} />
    ) : (
      <Button fullable label="登录" theme="primary" onClick={this.goLogin} />
    )
  }
}

export default connect(
  (store: any) => {
    let user = store.user
    let isLogged = !!(user && user.userId)
    let authStatus = store.auth.status
    return {
      isLogged,
      authStatus
    }
  },
  dispatch => {
    return {
      doLogout() {
        dispatch(authLogout())
      }
    }
  }
)(Logout)
