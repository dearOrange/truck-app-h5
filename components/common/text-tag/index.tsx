import React from 'react'

import classnames from 'classnames'
import Color from 'color'

import Style from './index.scss'

export default function Tag(props: {
  color: string
  label: string
  classNames?: any
}) {
  let textColor = props.color

  return (
    <>
      <div
        className={classnames(Style.tag, props.classNames)}
        style={{
          color: textColor,
          background: Color(props.color)
            .alpha(0.1)
            .toString()
        }}
      >
        {props.label}
      </div>
    </>
  )
}
