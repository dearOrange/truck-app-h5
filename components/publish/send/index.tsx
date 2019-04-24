import React, { Component } from 'react'

import Link from 'next/link'
import Style from './index.scss'

class PublishHeader extends Component<any> {
  render() {
    return (
      <>
        <div className={Style.img}>
          <img src="/static/img/publish.jpg" alt="" />
        </div>
        <div className={Style.button}>
          <Link href="/publish/depot">
            <a>发布出租</a>
          </Link>
          <Link href="/publish/rent">
            <a>发布求租</a>
          </Link>
        </div>
        <div className={Style.space} />
      </>
    )
  }
}

export default PublishHeader
