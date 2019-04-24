import React, { Component } from 'react'

import classnames from 'classnames'

import Style from './index.scss'

interface Props {
  type: string
  label?: string
  onChange?: (val: string) => void
  placeholder?: string
  clearable?: boolean
  readOnly?: boolean
  multiable?: boolean
  inline?: boolean
  initValue?: string

  renderTail?: () => React.ReactNode
  renderInputTool?: () => React.ReactNode
}

export default class Input extends Component<Props, any> {
  get canShowCloseBtn(): boolean {
    let { value } = this.state
    if (this.props.readOnly) {
      return false
    }
    return !!(this.props.clearable && value)
  }

  static defaultProps = {
    type: 'text',
    clearable: true,
    onChange: () => {}
  }

  state = {
    value: this.props.initValue || '',
    rows: 1
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && snapshot.rows) {
      this.setState({
        rows: snapshot.rows
      })
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.multiable) {
      let rows = prevState.value.split('\n').length
      let prevRows = prevState.rows
      if (rows !== prevRows) {
        return { rows }
      }
    }
    return null
  }

  private clear = () => {
    this.setState({ value: '' }, () => {
      this.props.onChange && this.props.onChange('')
    })
  }

  private onChange = (event: any) => {
    let inputValue = event.target.value
    this.setState({ value: inputValue }, () => {
      this.props.onChange && this.props.onChange(inputValue)
    })
  }

  private renderTail = () => {
    let tail = this.props.renderTail

    if (tail) {
      return <div className={Style.inputTail}>{tail()}</div>
    }

    return null
  }

  render() {
    let { value } = this.state
    return (
      <div
        className={classnames(Style.inputItem, {
          [Style.inline]: this.props.inline
        })}
      >
        {this.props.label ? (
          <span className={Style.label}>{this.props.label}</span>
        ) : null}
        <div
          className={classnames(Style.inputBox, {
            [Style.multiable]: !!this.props.multiable
          })}
        >
          {this.props.multiable ? (
            <textarea
              rows={this.state.rows}
              className={Style.inputField}
              onChange={this.onChange}
              value={value}
              placeholder={this.props.placeholder}
              readOnly={this.props.readOnly}
            />
          ) : (
            <input
              className={Style.inputField}
              type={this.props.type}
              onChange={this.onChange}
              value={value}
              placeholder={this.props.placeholder}
              readOnly={this.props.readOnly}
            />
          )}
          <div className={Style.inputFeildTool}>
            {this.canShowCloseBtn ? (
              <span className={Style.close} onClick={this.clear}>
                &times;
              </span>
            ) : this.props.renderInputTool ? (
              this.props.renderInputTool()
            ) : null}
          </div>
        </div>
        {this.renderTail()}
      </div>
    )
  }
}
