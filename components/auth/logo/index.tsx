import React from 'react'

import Style from './index.scss'
import classnames from 'classnames'

export default function Logo() {
  return (
    <div className={classnames(Style.logo)}>
      <img
        style={{
          width: 'auto',
          height: 'auto'
        }}
        src="/static/img/logo.png"
      />
    </div>
  )
}
