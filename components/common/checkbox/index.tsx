import React, { Component } from 'react'
import classnames from 'classnames'
import { uniqueId } from 'lodash'

import Group, { GroupContext } from './group'
import Style from './index.scss'

interface Props {
  onChange?: (checked: boolean, value?: any) => void
  value?: any
  iniChecked?: boolean
}

interface State {
  checked: boolean
}

class Checkbox extends Component<Props, State> {
  static contextType = GroupContext

  id = uniqueId('checkbox_')
  state = {
    checked: !!this.props.iniChecked
  }

  private onChange = () => {
    this.setState(
      prevState => {
        return {
          checked: !prevState.checked
        }
      },
      () => {
        this.doChange()
      }
    )
  }
  private doChange = () => {
    let checked = this.state.checked
    let value = this.props.value
    if (this.context && this.context.onChange) {
      this.context.onChange(value, checked)
    }
    this.props.onChange && this.props.onChange(checked, value)
  }

  componentDidMount() {
    if (typeof this.props.iniChecked === 'boolean' && this.props.iniChecked) {
      this.doChange()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState._initChecked !== nextProps.iniChecked) {
      return {
        _initChecked: nextProps.iniChecked,
        checked: nextProps.iniChecked
      }
    }
    return null
  }

  render() {
    return (
      <div className={Style.checkbox}>
        <span
          className={classnames(Style.option, {
            [Style.active]: this.state.checked
          })}
        >
          <input
            id={this.id}
            type="checkbox"
            checked={this.state.checked}
            onChange={this.onChange}
          />
          <i />
        </span>

        {this.props.children ? (
          <label htmlFor={this.id} className={Style.label}>
            {this.props.children}
          </label>
        ) : null}
      </div>
    )
  }

  static Group = Group
}

export default Checkbox
