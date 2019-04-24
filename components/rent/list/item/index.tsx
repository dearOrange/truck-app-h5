import React from 'react'

import RentCard from '@components/common/card/rent'

import Style from './index.scss'

export default function Item(props: { data: any }) {
  return (
    <div className={Style.item}>
      <RentCard data={props.data} />
    </div>
  )
}
