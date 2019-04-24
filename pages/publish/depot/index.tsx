import React, { Component } from 'react'

import Header from '@components/common/header'
import Depot from '@components/publish/depot'

import withAuth from '@hoc/with-auth'
class Publish extends Component<any> {
  render() {
    return (
      <>
        <Header title="发布冷库出租" bgColor={'white'} />
        <Depot />
      </>
    )
  }
}

export default withAuth(true)(Publish)
