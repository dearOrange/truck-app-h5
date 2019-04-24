import React, { Component } from 'react'

import Link from 'next/link'
import Whitespace from '@components/common/whitespace'
import Style from './index.scss'

class PublishHeader extends Component<any> {
  render() {
    return (
      <>
        <div className={Style.remark}>
          <div className={Style.one}>冷库、货主资源不好找？</div>
          <Whitespace size={0.16} />
          <div className={Style.two}>没问题，1号冷链帮你找</div>
          <Whitespace size={0.56} />
          <div className={Style.three}>省心出租只需三步</div>
          <Whitespace size={0.5} />
          <div className={Style.img}>
            <img src="/static/img/style.png" alt="" />
          </div>
        </div>
        <Whitespace size={0.54} />
        <div className={Style.button}>
          <Link href="/publish/hpdepot">
            <a>帮我出租</a>
          </Link>
          <Link href="/publish/hprent">
            <a>帮我求租</a>
          </Link>
        </div>
      </>
    )
  }
}

export default PublishHeader
