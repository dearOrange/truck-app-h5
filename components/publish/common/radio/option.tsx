import React, { Component } from 'react'
import classnames from 'classnames'

import Style from './index.scss'

interface Props {
  label?: string
  value?: any
  checked?: boolean
  onChange?: (value: any) => void
}

interface State {
  selected: boolean
}

class Option extends Component<Props, State> {
  state = {
    selected: false
  }

  get isSelected(): boolean {
    return this.state.selected
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.checked !== prevState.selected) {
      return {
        selected: nextProps.checked
      }
    }
    return null
  }

  shouldComponentUpdate(nextProps: Props, nextState: any) {
    return (
      nextProps.checked !== this.props.checked ||
      nextState.selected !== this.state.selected
    )
  }

  select = () => {
    this.props.onChange &&
      this.props.onChange(this.isSelected ? null : this.props.value)
    this.setState({ selected: this.isSelected ? false : true })
  }

  render() {
    return (
      <div
        className={classnames(Style.option, {
          [Style.selected]: this.state.selected
        })}
        onClick={this.select}
      >
        <svg>
          <use xlinkHref={this.state.selected ? '#icon-ico1' : '#icon-ico2'} />
        </svg>
        <span>{this.props.label}</span>
      </div>
    )
  }
}

export default Option
