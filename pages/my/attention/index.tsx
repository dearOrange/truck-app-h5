import React, { Component } from 'react'
import Tabs from '@components/my/common/tabs'

import EditableHeader from '@components/my/common/editable-header'

import Batch from '@components/my/attention/batch'
import List from '@components/my/attention/list'

import withAuth from '@hoc/with-auth'
import { MY_ATTENTION_TYPE } from '@constant/my'

import Style from './index.scss'

interface State {
  type: MY_ATTENTION_TYPE
}
class Attention extends Component<any, State> {
  state = {
    type: MY_ATTENTION_TYPE.EFFECTIVE
  }
  onTabChange = (tabItem: any) => {
    this.setState({ type: tabItem.value })
  }

  onBatchCompleted = () => {
    console.log('刷新')
    this.forceUpdate()
  }

  render() {
    const { type } = this.state
    return (
      <>
        <EditableHeader title="我的关注" />

        <Tabs
          onChange={this.onTabChange}
          initValue={this.state.type}
          list={[
            {
              value: MY_ATTENTION_TYPE.EFFECTIVE,
              label: '显示中'
            },
            {
              value: MY_ATTENTION_TYPE.INVALID,
              label: '已失效'
            }
          ]}
        />
        <div className={Style.content}>
          <List type={type} />
        </div>
        <Batch onBatchCompleted={this.onBatchCompleted} />
      </>
    )
  }
}

export default withAuth(true)(Attention)
