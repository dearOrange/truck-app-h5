import React from 'react'
import classnames from 'classnames'
import Router from 'next/router'

import Style from './index.scss'

function Back() {
  function goBack() {
    Router.back()
  }

  return (
    <div className={classnames(Style.back)} onClick={goBack}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-left-arrow" />
      </svg>
    </div>
  )
}

export default Back
