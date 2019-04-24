import React, { Component } from 'react'
import { withRouter } from 'next/router'

import Header from '@components/common/header'

import Tabs from '@components/news/common/tabs'
import List from '@components/news/list'
import withAuth from '@hoc/with-auth'
import { NEWS_TYPE } from '@constant/news'

import Style from './index.scss'

interface State {
  type: NEWS_TYPE
}
class News extends Component<any, State> {
  constructor(props) {
    super(props)
    let type = props.router.query.type || NEWS_TYPE.HOT
    this.state = {
      type
    }
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
        <Header title="新闻资讯" bgColor="white" />

        <Tabs
          onChange={this.onTabChange}
          initValue={this.state.type}
          list={[
            {
              value: NEWS_TYPE.HOT,
              label: '头条新闻'
            },
            {
              value: NEWS_TYPE.MAJOR,
              label: '重磅数据'
            }
          ]}
        />
        <div className={Style.content}>
          <List type={type} />
        </div>
      </>
    )
  }
}

export default withAuth()(withRouter(News))
