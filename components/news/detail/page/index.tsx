import React, { Component } from 'react'
import Whitespace from '@components/common/whitespace'
import Link from 'next/link'
import Style from './index.scss'
class Page extends Component<any, any> {
  render() {
    return (
      <>
        <ul className={Style.page}>
          <li>
            <span>上一篇：</span>
            <Link href="/news/detail">
              <a>新零售推动库尔勒香梨走向全国</a>
            </Link>
          </li>
          <Whitespace size={0.3} />
          <li>
            <span>下一篇：</span>
            <Link href="/news/detail">
              <a>香梨走向全国</a>
            </Link>
          </li>
        </ul>
      </>
    )
  }
}

export default Page
