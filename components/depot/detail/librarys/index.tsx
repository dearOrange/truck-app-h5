import React from 'react'

import { Tabs } from 'antd-mobile'

import Style from './index.scss'
interface Props {
  data: any[]
}
export default function Librarys(props: Props) {
  // let tabs = [{ title: '冷藏库' }, { title: '保鲜库' }, { title: '常温库' }]
  let tabs = props.data
  function renderTabContent(tab: any) {
    return (
      <div className={Style.content}>
        <div className={Style.item}>
          <p className={Style.text}>{tab.emptyCapacity}吨</p>
          <p className={Style.text}>区域可用容量</p>
        </div>
        <div className={Style.item}>
          <p className={Style.text}>{tab.emptyArea}㎡</p>
          <p className={Style.text}>区域可用面积</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Tabs
        tabs={tabs}
        tabBarActiveTextColor="#00ae66"
        tabBarUnderlineStyle={{
          display: 'none'
        }}
        renderTab={tab => <span>{tab.stockTypeNames}</span>}
      >
        {renderTabContent}
      </Tabs>
    </div>
  )
}
