import React from 'react'

import Style from './index.scss'

interface Props {
  icon?: string
  sub: string
  sup?: string
}

export default function Status(props: Props) {
  return (
    <div className={Style.status}>
      {props.icon ? <img className={Style.icon} src={props.icon} /> : null}
      <p className={Style.sub}>{props.sub}</p>
      {props.sup ? <p className={Style.sup}>{props.sup}</p> : null}
    </div>
  )
}
