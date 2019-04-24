import React, { Component } from 'react'

import Style from './index.scss'

interface Props {
  title: string
}

class GroupItem extends Component<Props> {
  render() {
    return (
      <>
        <div className={Style.separator} />
        <div className={Style.group}>
          <div className={Style.head}>{this.props.title}</div>
          <div className={Style.content}>{this.props.children}</div>
        </div>
      </>
    )
  }
}

export default GroupItem
