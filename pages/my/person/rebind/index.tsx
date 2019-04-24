import React, { Component } from 'react'
import { withRouter } from 'next/router'

import Whitespace from '@components/common/whitespace'
import Header from '@components/common/header'
import Form from '@components/my/person/rebind/form'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

interface State {
  submited: boolean
}

interface Props {
  router?: any
  [key: string]: any
}

class Rebind extends Component<Props, State> {
  render() {
    return (
      <>
        <Header bgColor="white" title="绑定新手机号" />
        <div className={Style.rebind}>
          <Whitespace size={0.3} />
          <Form />
        </div>
      </>
    )
  }
}

export default withAuth(true)(withRouter(Rebind))
