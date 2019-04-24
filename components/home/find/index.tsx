import React from 'react'
import Item from './item'

import Style from './index.scss'

export default function Find() {
  return (
    <>
      <div className={Style.list}>
        <Item
          title="找冷库"
          label="海量资源信息"
          url="/static/img/lengku.png"
        />
        <Item
          title="找货源"
          label="快速匹配需求"
          url="/static/img/huoyuan.png"
        />
      </div>
    </>
  )
}
