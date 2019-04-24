import React from 'react'
import DepotCard from '@components/common/card/depot'
import RentCard from '@components/common/card/rent'
import { TYPE } from './type'

import Style from './index.scss'

interface Props {
  list: any[]
  type: TYPE
}

export default function List(props: Props) {
  let list = props.list
  return (
    <div className={Style.list}>
      {list.map((item: any, index: number) => {
        return (
          <div className={Style.item} key={index}>
            {props.type === TYPE.DEPOT ? (
              <DepotCard data={item} />
            ) : (
              <RentCard data={item} />
            )}
          </div>
        )
      })}
    </div>
  )
}
