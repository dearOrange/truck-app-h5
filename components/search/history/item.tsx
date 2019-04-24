import React from 'react'
import Style from './index.scss'
import { HistoryItemModel } from './model'

interface Props {
  item: HistoryItemModel
}

export default function Item(props: Props) {
  return <div className={Style.item}>{props.item.label}</div>
}
