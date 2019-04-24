import React, { Component } from 'react'

import Style from './index.scss'

interface Props {
  label: string
  initialValue?: any[]
  onChange: (values: any[]) => void
}

export default class Range extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    let [min, max] = this.props.initialValue || ['', '']
    this.state = {
      min,
      max
    }
  }

  private onMinInputChange = (event: any) => {
    let inputValue = event.target.value
    this.setState(
      {
        min: inputValue
      },
      () => {
        this.emitChange()
      }
    )
  }
  private onMaxInputChange = (event: any) => {
    let inputValue = event.target.value
    this.setState(
      {
        max: inputValue
      },
      () => {
        this.emitChange()
      }
    )
  }

  private emitChange() {
    this.props.onChange([this.state.min, this.state.max])
  }

  render() {
    return (
      <div className={Style.range}>
        <input
          className={Style.rangeInput}
          placeholder={'最低' + this.props.label}
          onChange={this.onMinInputChange}
          value={this.state.min}
        />
        <span className={Style.rangeLine} />
        <input
          className={Style.rangeInput}
          placeholder={'最高' + this.props.label}
          onChange={this.onMaxInputChange}
          value={this.state.max}
        />
      </div>
    )
  }
}
