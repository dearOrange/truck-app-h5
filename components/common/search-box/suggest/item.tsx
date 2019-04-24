import React from 'react'
import Style from './index.scss'

import { SuggestItemModel } from './model'

interface Props {
  item: SuggestItemModel
}

export default function SuggestItem(props: Props) {
  return (
    <div className={Style.item}>
      <div className={Style.itemLeft}>
        <div className={Style.label}>{props.item.label}</div>
        <div className={Style.subtitle}>
          <span>{props.item.city}</span>
          <span>{props.item.address}</span>
        </div>
      </div>
      <div className={Style.itemRight}>
        <span className={Style.count}>{props.item.count}条</span>
      </div>
    </div>
  )
}
