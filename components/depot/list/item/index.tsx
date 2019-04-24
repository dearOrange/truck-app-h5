import React from 'react'

import DepotCard from '@components/common/card/depot'

import Style from './index.scss'

export default function Item(props: { data: any }) {
  return (
    <div className={Style.item}>
      <DepotCard data={props.data} />
    </div>
  )
}
