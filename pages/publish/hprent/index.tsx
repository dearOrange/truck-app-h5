import React, { Component } from 'react'

import Header from '@components/common/header'
import Rent from '@components/publish/hprent'

import withAuth from '@hoc/with-auth'
class Publish extends Component<any> {
  render() {
    return (
      <>
        <Header title="发布冷库求租" bgColor={'white'} />
        <Rent />
      </>
    )
  }
}

export default withAuth(true)(Publish)
