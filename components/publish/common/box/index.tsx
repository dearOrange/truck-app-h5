import React, { Component } from 'react'

import Style from './index.scss'

class Box extends Component<{
  title?: string
  children: any
  xref?: any
}> {
  render() {
    return (
      <div className={Style.box} ref={this.props.xref}>
        {this.props.title ? (
          <div className={Style.title}>
            <span>{this.props.title}</span>
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
