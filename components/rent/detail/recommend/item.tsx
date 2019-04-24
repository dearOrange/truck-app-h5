import React from 'react'
import { fmtDate } from '@utils/date'
import Router from 'next/router'

import Style from './index.scss'

function RecommendItem(props: any) {
  let { data } = props
  return (
    <div
      className={Style.item}
      onClick={() => {
        Router.push('/rent/detail?id=' + data.relatedDataUkid)
      }}
    >
      <div className={Style.title}>杭州市-冷藏库</div>
      <ul className={Style.content}>
        <li>
          <span className={Style.value}>需求面积：</span>
          <span className={Style.key}>{data.demandArea}㎡</span>
        </li>
        <li>
          <span className={Style.value}>需求温度：</span>
          <span className={Style.key}>
            {data.expectedPriceType === 'N'
              ? data.expectedPriceTypeName
              : data.expectedPriceBegin +
                '-' +
                data.expectedPriceEnd +
                ' ' +
                data.stockPriceUnitName}
          </span>
        </li>
        <li>
          <span className={Style.value}>入驻时间：</span>
          <span className={Style.key}>{fmtDate(data.planEnterDate)}</span>
        </li>
      </ul>
    </div>
  )
}
export default RecommendItem
