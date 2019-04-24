import React from 'react'

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
          <span className={Style.key}>总容量</span>
          <span className={Style.value}>{data.totalCapacity}吨</span>
        </li>
        <li>
          <span className={Style.key}>可用容量</span>
          <span className={Style.value}>{data.emptyCapacity}吨</span>
        </li>
        <li>
          <span className={Style.key}>总面积</span>
          <span className={Style.value}>{data.totalArea}㎡</span>
        </li>
        <li>
          <span className={Style.key}>可用面积</span>
          <span className={Style.value}>{data.emptyArea}㎡</span>
        </li>
        <li>
          <span className={Style.key}>层高</span>
          <span className={Style.value}>{data.floorHeight}m</span>
        </li>
        <li>
          <span className={Style.key}>楼层</span>
          <span className={Style.value}>
            {data.locatedFloor ? data.locatedFloor + '层' : ''}
          </span>
        </li>
        <li>
          <span className={Style.key}>温度范围</span>
          <span className={Style.value}>
            {data.temperatureLower}~{data.temperatureUpper}℃
          </span>
        </li>
        <li>
          <span className={Style.key}>存放品类</span>
          <span className={Style.value}>
            {data.ptStockPublish.suitableCategoryName}
          </span>
        </li>
      </ul>
      {/* <div className={Style.more}>更多仓库信息</div> */}
    </div>
  )
}
