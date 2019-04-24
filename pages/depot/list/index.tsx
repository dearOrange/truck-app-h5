import React, { Component } from 'react'
import SearchBox from '@components/common/search-box'
import Header from '@components/common/header'

import Condition from '@components/depot/list/condition'
import Result from '@components/depot/list'
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
        <Header title="冷库列表" textColor="white" />
        <div className={Style.content}>
          <Condition onChange={this.onConditionChange} />
          <Result params={this.state.params} />
        </div>
      </>
    )
  }
}

export default withAuth(true)(List)
