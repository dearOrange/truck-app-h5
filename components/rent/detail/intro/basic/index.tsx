import React from 'react'
import { fmtDate } from '@utils/date'
import Style from './index.scss'
interface Props {
  data: any
}
export default function Basic(props: Props) {
  let data = props.data
  return (
    <div>
      <ul className={Style.basic}>
        <li>
          <span className={Style.key}>需求面积</span>
          <span className={Style.value}>{data.demandArea}㎡</span>
        </li>
        <li>
          <span className={Style.key}>需求温度</span>
          <span className={Style.value}>
            {(data.temperatureLower
              ? data.temperatureLower + ' ℃ ' + '~'
              : '') +
              (data.temperatureUpper ? data.temperatureUpper + ' ℃ ' : '')}
          </span>
        </li>
        <li>
          <span className={Style.key}>计划入驻</span>
          <span className={Style.value}>{fmtDate(data.planEnterDate)}</span>
        </li>
        <li>
          <span className={Style.key}>计划租期</span>
          <span className={Style.value}>{data.planRentPeriodName}</span>
        </li>
        <li>
          <span className={Style.key}>区域</span>
          <span className={Style.value}>{data.province + '' + data.city}</span>
        </li>
        <li>
          <span className={Style.key}>楼层</span>
          <span className={Style.value}>{data.floorHeight}层</span>
        </li>
        <li>
          <span className={Style.key}>价格</span>
          <span className={Style.value}>
            {data.expectedPriceType === 'N'
              ? data.expectedPriceTypeName
              : data.expectedPriceBegin +
                '-' +
                data.expectedPriceEnd +
                ' ' +
                data.stockPriceUnitName}
          </span>
        </li>
      </ul>
    </div>
  )
}
