import React, { Component } from 'react'

import classnames from 'classnames'

import Style from './index.scss'

interface Props {
  type: string
  onChange?: (val: string) => void
  classStyle?: boolean
  inline?: boolean
  initValue?: string

  renderTail?: () => React.ReactNode
  renderInputTool?: () => React.ReactNode
}

export default class Input extends Component<Props, any> {
  static defaultProps = {
    type: 'text',
    onChange: () => {},
    classStyle: false
  }

  state = {
    value: this.props.initValue || ''
  }

  componentDidUpdate() {}

  private onChange = (event: any) => {
    let inputValue = event.target.value
    this.setState({ value: inputValue }, () => {
      this.props.onChange && this.props.onChange(inputValue)
    })
  }
  render() {
    let { value } = this.state
    return (
      <div className={classnames(Style.inputBox)}>
        <div
          className={classnames(Style.inputField, {
            [Style.classStyle]: this.props.classStyle
          })}
        >
          <input
            type={this.props.type}
            onChange={this.onChange}
            value={value}
          />
        </div>
      </div>
    )
  }
}
