import React, { Component } from 'react'
import withTabbar from '@hoc/with-tabbar'

import Header from '@components/publish/right'
import Send from '@components/publish/send'
import Process from '@components/publish/process'

import withAuth from '@hoc/with-auth'
class Publish extends Component<any> {
  render() {
    return (
      <>
        <Header title="发布" />
        <Send />
        <Process />
      </>
    )
  }
}

export default withAuth(true)(withTabbar(Publish))
