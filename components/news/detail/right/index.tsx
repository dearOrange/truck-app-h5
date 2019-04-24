import React, { Component } from 'react'

import Header from '@components/common/header'
// import Link from 'next/link'

interface Props {
  title: string
}

class PublishHeader extends Component<Props, any> {
  renderRightRegist = () => {
    return (
      <a>
        <span>分享</span>
      </a>
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

export default PublishHeader
