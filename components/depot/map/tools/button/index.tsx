import React from 'react'
import classnames from 'classnames'
import Style from './index.scss'

interface Props {
  text: string
  icon: string
  onClick: () => void
  className?: string
}

export default function Button(props: Props) {
  return (
    <div
      className={classnames(Style.button, props.className)}
      onClick={props.onClick}
    >
      <svg aria-hidden="true" className="icon">
        <use xlinkHref={'#icon-' + props.icon} />
      </svg>
      <span className={Style.text}>{props.text}</span>
    </div>
  )
}
