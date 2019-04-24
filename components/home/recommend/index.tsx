import React, { Component } from 'react'
import { isEmpty } from 'lodash'

import Loading from '@components/common/loading'
import Empty from '@components/common/empty'
import Box from '@components/common/box'
import WhiteSpace from '@components/common/whitespace'

import List from './list'
import Tab from './tab'
import More from './more'

import { fetchDepotSelected, fetchRentSelected } from '@api/recommend'

import { TYPE } from './type'

import Style from './index.scss'

interface Props {}
interface State {
  loading: boolean
  list: any
}

export default class Recommend extends Component<Props, State> {
  state: State = {
    list: null,
    loading: true
  }

  private type: TYPE = TYPE.DEPOT // 出租/求租

  private get isEmpty(): boolean {
    return isEmpty(this.state.list)
  }
  getDepotList = () => {
    //出租
    return fetchDepotSelected(10)
  }
  getRentList = () => {
    //求租
    return fetchRentSelected(10, 330100)
  }

  private async load() {
    let { type } = this
    this.setState({ loading: true, list: [] })
    let { success, data } = await (TYPE.DEPOT === type
      ? this.getDepotList()
      : this.getRentList())
    if (success) {
      this.setState({
        list: data
      })
    }
    this.setState({
      loading: false
    })
  }

  onTabChange = (type: TYPE) => {
    this.type = type
    this.load()
  }

  render() {
    let type = this.type
    let { loading, list } = this.state
    let isLoading = loading

    return (
      <>
        <Box
          title="精选推荐"
          rightRender={() => {
            return <Tab onTabChange={this.onTabChange} />
          }}
        >
          <div className={Style.recommend}>
            {isLoading ? (
              <Loading />
            ) : this.isEmpty ? (
              <Empty />
            ) : (
              <>
                <List list={list} type={type} />
                <WhiteSpace size={0.3} />
                <More type={type} />
              </>
            )}
          </div>
        </Box>
      </>
    )
  }
}
