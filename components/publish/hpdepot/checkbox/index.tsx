import React, { Component } from 'react'
import classnames from 'classnames'

import Style from './index.scss'

interface Props {
  onChange?: (value: string, checked: boolean) => void
  // iniChecked?: boolean
  label: string
}

interface State {
  checked: boolean
}

class Checkbox extends Component<Props, State> {
  state = {
    checked: false
  }

  private onClick = () => {
    this.setState(
      prevState => {
        return {
          checked: !prevState.checked
        }
      },
      () => {
        this.props.onChange &&
          this.props.onChange(this.props.label, this.state.checked)
      }
    )
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState._initChecked !== nextProps.iniChecked) {
  //     return {
  //       _initChecked: nextProps.iniChecked,
  //       checked: nextProps.iniChecked
  //     }
  //   }
  //   return null
  // }

  render() {
    return (
      <div className={Style.checkbox}>
        <span
          className={classnames(Style.option, {
            [Style.active]: this.state.checked
          })}
          onClick={this.onClick}
        >
          {this.props.label}
        </span>
      </div>
    )
  }
}

export default Checkbox
