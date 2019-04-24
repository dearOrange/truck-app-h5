import React, { Component } from 'react'

import Router from 'next/router'

import Style from './index.scss'

class Box extends Component<{
  title?: string
  children: any
  xref?: any
  right?: {
    text?: string
    link: string
  }
  rightRender?: () => React.ReactNode
}> {
  onRightTap = () => {
    if (this.props.right) {
      if (this.props.right.link) {
        Router.push(this.props.right.link)
      }
    }
  }

  renderRight: () => React.ReactNode = () => {
    if (this.props.rightRender) {
      return this.props.rightRender()
    }

    if (this.props.right) {
      return (
        <span className={Style.right} onClick={this.onRightTap}>
          {this.props.right.text || '更多'}
        </span>
      )
    }
    return null
  }

  render() {
    return (
      <div className={Style.box} ref={this.props.xref}>
        {this.props.title ? (
          <div className={Style.title}>
            <span>{this.props.title}</span>
            {this.renderRight()}
          </div>
        ) : null}
        <div className={Style.conetnt}>{this.props.children}</div>
      </div>
    )
  }
}

export default React.forwardRef((props: any, ref: any) => (
  <Box xref={ref} {...props}>
    {props.children}
  </Box>
))
