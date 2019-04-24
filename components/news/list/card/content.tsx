import React, { Component } from 'react'

import Style from './index.scss'

export default class Content extends Component<any> {
  render() {
    return (
      <div className={Style.content}>
        <div className={Style.title}>
          这是咨询标题生鲜农产品冷链物流成本高，可为何依......
        </div>
        <div className={Style.date}>
          <p>2018-12-12</p>
          <p>
            <svg aria-hidden="true">
              <use xlinkHref="#icon-yanjing" />
            </svg>
            <span>1222</span>
          </p>
        </div>
      </div>
    )
  }
}
