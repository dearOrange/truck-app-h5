import React, { Component } from 'react'

import Router from 'next/router'

import Whitespace from '@components/common/whitespace'
import Header from '@components/common/header'
import Button from '@components/common/button'
import withAuth from '@hoc/with-auth'

import Gender from '@components/my/person/gender'
import Avatar from '@components/my/person/avatar'
import RegistTime from '@components/my/person/regist-time'

import createUserArrowButton from '@components/my/person/__utils/create-user-arrow-button'

import Style from './index.scss'

const UserName = createUserArrowButton({
  label: '用户名',
  field: ['userName'],
  onTap: {
    pathname: '/my/person/user'
  }
})
const UserID = createUserArrowButton({
  label: 'ID',
  field: ['userId']
})
const Wechat = createUserArrowButton({
  label: '微信号',
  field: ['wechat'],
  onTap: {
    pathname: '/my/person/wechat'
  }
})
const MobileNumber = createUserArrowButton({
  label: '手机号',
  field: ['mobileNumber'],
  onTap: {
    pathname: '/my/person/unbind'
  }
})
const QQ = createUserArrowButton({
  label: 'QQ',
  field: ['qq'],
  onTap: {
    pathname: '/my/person/qq'
  }
})

class Person extends Component<any, any> {
  goBack() {
    Router.replace({
      pathname: '/my'
    })
  }

  render() {
    return (
      <>
        <Header title="我的个人信息" bgColor="white" />
        <div className={Style.person}>
          <Whitespace size={0.3} />
          <Avatar />
          <Gender />
          <UserName />
          <MobileNumber />
          <Wechat />
          <QQ />
          <Whitespace size={0.3} />
          <UserID />
          <RegistTime />
          <Whitespace size={0.3} />
          {/* <Button
            label="知道了"
            fullable
            theme="primary"
            onClick={this.goBack}
          /> */}
        </div>
      </>
    )
  }
}
export default withAuth(true)(Person)
