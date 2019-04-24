import React, { Component } from 'react'
import { withRouter } from 'next/router'

import Whitespace from '@components/common/whitespace'
import Header from '@components/common/header'
import Form from '@components/my/person/unbind/form'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

interface State {
  submited: boolean
}

interface Props {
  router?: any
  [key: string]: any
}

class Unbind extends Component<Props, State> {
  render() {
    return (
      <>
        <Header bgColor="white" title="解绑原手机号" />
        <div className={Style.unbind}>
          <Whitespace size={0.3} />
          <Form />
        </div>
      </>
    )
  }
}

export default withAuth(true)(withRouter(Unbind))
