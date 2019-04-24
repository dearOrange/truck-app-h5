import React, { Component } from 'react'

import Header from '@components/common/header'
import List from '@components/my/footprint/list'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

interface State {}
class Footprint extends Component<any, State> {
  render() {
    return (
      <>
        <Header title="我的足迹" bgColor="white" />

        <div className={Style.content}>
          <List />
        </div>
      </>
    )
  }
}

export default withAuth(true)(Footprint)
