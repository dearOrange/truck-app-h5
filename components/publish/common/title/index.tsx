import React, { Component } from 'react'

import Style from './index.scss'

interface Props {
  title: string
  remark?: string
}

class TitleItem extends Component<Props> {
  render() {
    return (
      <>
        <div className={Style.group}>
          <div className={Style.head}>
            <p className={Style.title}>{this.props.title}</p>
            <p className={Style.remark}>{this.props.remark}</p>
          </div>
          <div className={Style.content}>{this.props.children}</div>
        </div>
      </>
    )
  }
}

export default TitleItem
