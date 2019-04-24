import React from 'react'

import RentCard from '@components/common/card/rent'
import DepotCard from '@components/common/card/depot'

import Style from './index.scss'

export default function Item(props) {
  let data = props.data.myDataCenterObject
  return (
    <div className={Style.item}>
      {data.relatedDataType === 'SR' ? (
        <RentCard data={data} />
      ) : (
        <DepotCard data={data} />
      )}
    </div>
  )
}
