import React, { Component } from 'react'
import Router from 'next/router'

import Img from './img'
import Content from './content'
import Style from './index.scss'
export default class index extends Component<any> {
  render() {
    return (
      <>
        <div
          className={Style.card}
          onClick={() => {
            Router.push('/news/detail?id=' + Math.random())
          }}
        >
          <Img />
          <Content />
        </div>
      </>
    )
  }
}
