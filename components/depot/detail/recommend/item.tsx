import React from 'react'
import Whitespace from '@components/common/whitespace'
import Router from 'next/router'
import { joinPosition } from '@utils/index'

import Style from './index.scss'

function RecommendItem(props: any) {
  let { data } = props

  function go() {
    let href = '/depot/detail?id=' + data.relatedDataUkid
    let as = href
    Router.push(href, as, {
      shallow: false
    })
  }

  return (
    <div className={Style.item} onClick={go}>
      <div className={Style.img}>
        <img src={data.photoUrl} />
      </div>
      <Whitespace size={0.2} />
      <div className={Style.content}>
        <span className={Style.title}>{data.title}</span>
        <Whitespace size={0.15} />
        <span className={Style.address}>{data.province + '-' + data.city}</span>
      </div>
    </div>
  )
}
export default RecommendItem
