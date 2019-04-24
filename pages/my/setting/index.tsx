import React, { Component } from 'react'

import Header from '@components/common/header'
import Whitespace from '@components/common/whitespace'

import ArrowButton from '@components/my/common/arrow-button'
import Logout from '@components/my/setting/logout'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

class Setting extends Component<any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <Header title="系统设置" bgColor="white" />
        <div className={Style.setting}>
          <Whitespace size={0.3} />
          <div className={Style.links}>
            <ArrowButton leftLabel="关于我们" />
            <ArrowButton noArrow leftLabel="版本号" rightLabel="1.0.0" />
          </div>
          <Whitespace size={0.5} />
          <Logout />
        </div>
      </>
    )
  }
}

export default withAuth()(Setting)
