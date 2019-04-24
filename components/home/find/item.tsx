import React from 'react'

import Style from './index.scss'

interface Props {
  title: string
  label: string
  url: string
}

export default function Item(props: Props) {
  return (
    <div className={Style.item}>
      <div className={Style.desc}>
        <p className={Style.title}>{props.title}</p>
        <p>{props.label}</p>
      </div>
      <div className={Style.img}>
        <img src={props.url} alt="图片" />
      </div>
    </div>
  )
}
