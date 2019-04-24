import React from 'react'
import TabBar, { TabItemType } from '@components/common/tab-bar'

export default function withTabBar(TabBarComponent: any) {
  return class WithTabsComponent extends React.Component<any, any> {
    private tabs: TabItemType[] = [
      {
        title: '首页',
        link: '/home'
      },
      {
        title: '发布',
        link: '/publish'
      },
      {
        title: '我的',
        link: '/my'
      }
    ]

    constructor(props: any) {
      super(props)
    }
    render() {
      return (
        <>
          <TabBar list={this.tabs}>
            <TabBarComponent />
          </TabBar>
        </>
      )
    }
  }
}
