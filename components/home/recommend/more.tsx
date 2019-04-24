import React, { Component } from 'react'
import Router from 'next/router'

import { TYPE } from './type'

import Style from './index.scss'
interface Props {
  type: TYPE
}
export default class More extends Component<Props> {
  goList = () => {
    let type = this.props.type
    let path =
      type === TYPE.DEPOT
        ? {
            pathname: '/depot/list'
          }
        : {
            pathname: '/rent/list'
          }
    Router.push(path)
  }

  render() {
    return (
      <>
        <div className={Style.more} onClick={this.goList}>
          <span className={Style.text}>查看更多</span>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-jiantou" />
          </svg>
        </div>
      </>
    )
  }
}
