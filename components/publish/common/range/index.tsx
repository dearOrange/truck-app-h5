import React, { Component } from 'react'

import classnames from 'classnames'

import Style from './index.scss'

export interface Props {
  label?: string
  inherit?: string
  children?: React.ReactNode
}

class Range extends Component<Props> {
  render() {
    return (
      <div className={classnames(Style.radio)}>
        <div className={Style.label}>{this.props.label}</div>
        <div
          className={classnames(Style.options, {
            [Style.inherit]: this.props.inherit
          })}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Range
