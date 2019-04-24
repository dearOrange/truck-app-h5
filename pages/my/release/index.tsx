import React, { Component } from 'react'
import Tabs from '@components/my/common/tabs'

import EditableHeader from '@components/my/common/editable-header'

import Batch from '@components/my/release/batch'
import List from '@components/my/release/list'

import withAuth from '@hoc/with-auth'
import { MY_RELEASE_TYPE } from '@constant/my'

import Style from './index.scss'

interface State {
  type: MY_RELEASE_TYPE
}
class Release extends Component<any, State> {
  state = {
    type: MY_RELEASE_TYPE.EFFECTIVE
  }
  onTabChange = (tabItem: any) => {
    this.setState({ type: tabItem.value })
  }

  onBatchCompleted = () => {
    this.forceUpdate()
  }

  render() {
    const { type } = this.state
    return (
      <>
        <EditableHeader title="我的发布" />

        <Tabs
          onChange={this.onTabChange}
          initValue={this.state.type}
          list={[
            {
              value: MY_RELEASE_TYPE.EFFECTIVE,
              label: '显示中'
            },
            {
              value: MY_RELEASE_TYPE.NONE,
              label: '未发布'
            },
            {
              value: MY_RELEASE_TYPE.INVALID,
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

export default withAuth(true)(Release)
