import React from 'react'
import classnames from 'classnames'

import Style from './index.scss'

interface Props {
  text?: string
  fullscreen?: boolean
}

export default function Loading(props: Props) {
  return (
    <div
      className={classnames(Style.loading, {
        [Style.fullscreen]: props.fullscreen
      })}
    >
      {props.text || '正在加载中...'}
    </div>
  )
}
