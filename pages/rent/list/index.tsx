import React, { Component } from 'react'
import Header from '@components/common/header'

import Condition from '@components/rent/list/condition'
import Result from '@components/rent/list'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

interface State {
  params: any
}

class List extends Component<any, State> {
  state = {
    params: {}
  }

  onConditionChange = (params: any) => {
    this.setState({ params })
  }

  render() {
    return (
      <>
        {/* <SearchBox backable /> */}
        <Header title="求租列表" textColor="white" />
        <div className={Style.content}>
          <Condition onChange={this.onConditionChange} />
          <Result params={this.state.params} />
        </div>
      </>
    )
  }
}

export default withAuth(true)(List)
