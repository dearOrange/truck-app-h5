import React from 'react'

import RentCard from '@components/common/card/rent'
import DepotCard from '@components/common/card/depot'
import SelectableItem from '@components/my/common/selectable-item'
import GroupItem from '@components/my/common/group-item'

import { format } from 'date-fns'
// import zhLocale from 'date-fns/locale/zh_cn'

import Style from './index.scss'

export default function Item(props) {
  return (
    <GroupItem
      title={'发布时间:' + format(props.data.publishDate, 'YYYY年MM月DD日')}
    >
      <div className={Style.item}>
        <SelectableItem
          id={props.data.relatedDataUkid}
          data={props.data}
          renderItem={(data: any) => {
            return data.relatedDataType === 'SR' ? (
              <RentCard data={data} />
            ) : (
              <DepotCard data={data} />
            )
          }}
        />
      </div>
    </GroupItem>
  )
}
