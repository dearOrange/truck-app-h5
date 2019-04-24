import React, { Component } from 'react'
import { withRouter } from 'next/router'

import Header from '@components/common/header'
import { fetchAppoint } from '@api/appoint'
import DepotContent from '@components/appoint/depot'
import AppointForm from '@components/appoint/form'
import AppointSuccess from '@components/appoint/success'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

interface State {
  submited: boolean
}

interface Props {
  router?: any
  [key: string]: any
}

class Appoint extends Component<Props, State> {
  state = {
    submited: false
  }

  private onSubmit = async (data: any) => {
    // data.relatedDataUkid = value

    let { success } = await fetchAppoint({
      ...data,
      relatedDataUkid: this.props.router.query.id
    })
    if (success) {
      this.setState({
        submited: true
      })
    }
  }

  render() {
    const { submited } = this.state
    return (
      <>
        <Header bgColor="white" title="免费预约看库" />
        <div className={Style.appoint}>
          {!submited ? (
            <>
              <div className={Style.summary}>
                <DepotContent />
              </div>
              <AppointForm onSubmit={this.onSubmit} />
            </>
          ) : (
            <AppointSuccess />
          )}
        </div>
      </>
    )
  }
}

export default withAuth()(withRouter(Appoint))
