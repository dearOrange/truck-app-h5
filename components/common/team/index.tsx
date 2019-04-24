import React, { Component } from 'react'
import WhiteSpace from '@components/common/whitespace'

import Style from './index.scss'

export default class index extends Component {
  render() {
    return (
      <>
        <div className={Style.team}>
          <h2>1号冷链平台资质</h2>
          <WhiteSpace size={0.4} />
          <h3>5大商协会联合权威认证</h3>
          <WhiteSpace size={0.25} />
          <div className={Style.pic}>
            <img src="/static/img/shangbiao.png" alt="合作商家" />
          </div>
          <WhiteSpace size={0.3} />
          <div className={Style.tel}>
            <span>咨询电话：</span>
            <span className={Style.num}>400-456-0099</span>
          </div>
        </div>
      </>
    )
  }
}
