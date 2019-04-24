import React from 'react'
import Tag from '@components/common/text-tag'
import Style from './index.scss'
import { joinPosition } from '@utils/index'

interface Props {
  data: any
}
export default function Meta(props: Props) {
  let data = props.data
  let ptStock = props.data.ptStockPriceList

  return (
    <div className={Style.meta}>
      <div className={Style.title}>
        {joinPosition(data, '.') + '·' + data.stockId}
      </div>
      <div className={Style.priceAndTags}>
        {ptStock.map((item: any, index: number) => {
          return (
            <div key={index} className={Style.price}>
              <span className={Style.num}>{item.price}</span>
              <span className={Style.unit}>{item.stockPriceUnitName}</span>
            </div>
          )
        })}

        <div className={Style.tags}>
          {/* <Tag classNames={Style.item} label={'实地认证'} color={'#49c592'} /> */}
          {data.ptStockPublish.realNameCertified === 1 ? (
            <Tag classNames={Style.item} label={'个人认证'} color={'#fb8a81'} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
