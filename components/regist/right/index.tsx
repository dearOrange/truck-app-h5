import React, { Component } from 'react'

import Header from '@components/common/header'
import Link from 'next/link'
// import Style from './index.scss'

interface Props {
  title: string
}

class LoginHeader extends Component<Props, any> {
  renderRightRegist = () => {
    return (
      <Link href="/login">
        <a>
          <span>登录</span>
        </a>
      </Link>
    )
  }

  render() {
    return (
      <Header
        title={this.props.title}
        bgColor="white"
        renderHeaderRight={this.renderRightRegist}
      />
    )
  }
}

export default LoginHeader
