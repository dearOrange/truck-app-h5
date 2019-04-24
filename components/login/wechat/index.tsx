import React from 'react'

import Style from './index.scss'

export default function WeChat() {
  return (
    <div className={Style.wechat}>
      <svg aria-hidden="true">
        <use xlinkHref="#icon-weixin" />
      </svg>
      <span>微信登录</span>
    </div>
  )
}
