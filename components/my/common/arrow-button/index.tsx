import React, { Component } from 'react'
import classnames from 'classnames'

import Style from './index.scss'

type LabelRender = () => React.ReactNode
type LabelType = string | LabelRender
interface Props {
  leftLabel: LabelType
  rightLabel?: LabelType
  noArrow?: boolean
  renderHeader?: () => React.ReactNode
  onClick?: (event: any) => void
}

function isString(label: LabelType): label is string {
  return typeof (label as string) === 'string'
}

function isFunction(label: LabelType): label is LabelRender {
  return typeof (label as LabelRender) === 'function'
}

class ArrowButton extends Component<Props> {
  onClick = (event: any) => {
    this.props.onClick && this.props.onClick(event)
  }

  renderLabel = (type: 'left' | 'right') => {
    let propsLabel: LabelType = this.props[`${type}Label`]
    let labelContent

    if (propsLabel) {
      if (isString(propsLabel)) {
        labelContent = propsLabel
      } else if (isFunction(propsLabel)) {
        labelContent = propsLabel()
      }

      return (
        <span className={classnames(Style.label, Style[`${type}Label`])}>
          {labelContent}
        </span>
      )
    }
    return null
  }

  render() {
    return (
      <>
        <div className={Style.arrowButton} onClick={this.onClick}>
          {this.props.renderHeader ? (
            <div className={Style.header}>{this.props.renderHeader()}</div>
          ) : null}

          <div
            className={classnames(Style.inner, {
              [Style.hasHeader]: this.props.renderHeader
            })}
          >
            <div className={Style.left}>{this.renderLabel('left')}</div>
            <div className={Style.right}>
              {this.renderLabel('right')}
              {this.props.noArrow ? null : (
                <svg
                  className={classnames('icon', Style.arrow)}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-jiantou" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ArrowButton
