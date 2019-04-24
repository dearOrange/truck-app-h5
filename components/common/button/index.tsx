import React, { Component } from 'react'
import classnames from 'classnames'

import { isPromise } from '@utils/is'

import Style from './index.scss'
interface Props extends React.ButtonHTMLAttributes<any> {
  size?: 'small' | 'middle' | 'large'
  theme?: 'primary' | 'info' | 'save'
  label: string
  disabled?: boolean
  fullable?: boolean
  round?: boolean
  async?: boolean
}

export default class Button extends Component<Props, any> {
  static defaultProps = {
    size: 'middle',
    theme: 'primary',
    disabled: false,
    fullable: true
  }

  private get btnText(): string {
    let btnLabel = this.props.label
    return this.props.async && this.state.processing
      ? `正在${btnLabel}中`
      : btnLabel
  }

  _clickHandlePromise: any = null

  state = {
    processing: false
  }

  onClick = event => {
    let onParentClick: any = this.props.onClick
    if (!this.props.disabled && onParentClick) {
      this._clickHandlePromise = new Promise(resolve => {
        this.setState({ processing: true })
        let result = onParentClick(event)

        if (isPromise(result)) {
          result.then(() => {
            this.setState({ processing: false })
            resolve(true)
          })
        } else {
          this.setState({ processing: false })
          resolve(true)
        }
      })
    }
  }

  componentWillUnmount() {
    this._clickHandlePromise = null
  }

  render() {
    let props = this.props
    return (
      <button
        className={classnames(
          Style.button,
          Style[`button--${props.size}`],
          Style[`button--${props.theme}`],

          {
            [Style[`button--full`]]: props.fullable,
            [Style[`button--round`]]: props.round,
            [Style[`button--disabled`]]: props.disabled
          }
        )}
        onClick={this.onClick}
        disabled={props.disabled}
      >
        {this.btnText}
      </button>
    )
  }
}
