import React from 'react'

// import Style from './index.scss'

export default function Feature(props: { data: any }) {
  return (
    <>
      <div>
        {props.data}
        {/* <ul className={Style.feature}>
          <li>
            <span className={Style.label}>仓库亮点</span>
            <span className={Style.text}>{props.data}</span>
          </li>
          <li>
            <span className={Style.label}>交　　通</span>
            <span className={Style.text}>
              位于萧山区衙前镇，距离机场12km 距离 G60高速3.5km 距离市区25km
              距离杭州 东站23km 距离104国道2km
            </span>
          </li>
        </ul> */}
      </div>
    </>
  )
}
