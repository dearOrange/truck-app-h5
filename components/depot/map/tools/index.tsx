import React from 'react'
import Router from 'next/router'

import Button from './button'
import Style from './index.scss'

import { BMapUtil } from 'rc-bmap-for-nextjs'

interface Props {
  onPosChange: (point: any) => any
  onOpenFilterPanel: () => void
}

export default function Tools(props: Props) {
  function onTapList() {
    Router.push({
      pathname: '/depot/list'
    })
  }
  function onTapFilter() {
    props.onOpenFilterPanel()
  }

  async function onTapPosition() {
    let data = await BMapUtil.getCurrentPosition()
    let { latitude: lat, longitude: lng } = data
    props.onPosChange({ lat, lng })
  }

  return (
    <div className={Style.tools}>
      <Button
        onClick={onTapList}
        className={Style.item}
        text="列表"
        icon="map-liebiao"
      />
      <Button
        onClick={onTapFilter}
        className={Style.item}
        text="刷选"
        icon="map-guolv"
      />
      <Button
        onClick={onTapPosition}
        className={Style.item}
        text="定位"
        icon="map-dingwei"
      />
    </div>
  )
}
