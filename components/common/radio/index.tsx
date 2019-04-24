import React, { Component, PureComponent } from 'react'

import Option from './option'
import Range from './range'

import classnames from 'classnames'

import Style from './index.scss'

export interface Props {
  label?: string
  horizontal?: boolean
  rangeRender?: () => void
  children?: React.ReactNode
  range?: boolean
  rangeLable?: string
  rangeInitial?: any[]
  onRangeChange?: (values: any[]) => void
}

class Radio extends Component<Props> {
  render() {
    let rangeLabel: string = this.props.range
      ? this.props.rangeLable
        ? this.props.rangeLable || ''
        : this.props.label || ''
      : ''

    return (
      <div
        className={classnames(Style.radio, {
          [Style.horizontal]: this.props.horizontal
        })}
      >
        <div className={Style.label}>{this.props.label}</div>

        {this.props.range ? (
          <Range
            label={rangeLabel}
            initialValue={this.props.rangeInitial}
            onChange={this.props.onRangeChange || ((v: any[]) => {})}
          />
        ) : null}

        <div className={Style.options}>{this.props.children}</div>
      </div>
    )
  }

  static Option = Option
}

export default Radio
