import React, { Component } from 'react'

import classnames from 'classnames'
import { getDicts } from '@api/common/dictionary'
import Style from './index.scss'

interface Props {
  checked?: string
  type: string
  disabled?: boolean
  onChange?: (val: string) => void
  inline?: boolean
  initValue?: string
}
interface State {
  typeVal: any
}
export default class Select extends Component<Props, State> {
  static defaultProps = {
    onChange: () => {},
    checked: '',
    disabled: false
  }

  state = {
    value: this.props.initValue || '',
    // rows: 1,
    typeVal: null
  }
  dicts = async type => {
    let { success, data } = await getDicts(type)
    if (success) {
      this.setState({
        typeVal: data
      })
    }
  }
  componentDidMount() {
    this.dicts(this.props.type)
  }
  private onChange = (event: any) => {
    let inputValue = event.target.value
    this.setState(() => {
      this.props.onChange && this.props.onChange(inputValue)
    })
  }
  render() {
    let { typeVal } = this.state
    return (
      <div className={classnames(Style.inputBox)}>
        <div className={classnames(Style.inputField)}>
          <select onChange={this.onChange}>
            <option disabled={this.props.disabled} value="">
              请选择
            </option>
            {typeVal
              ? typeVal.map((item: any, index: number) => {
                  return (
                    <option
                      key={index}
                      disabled={this.props.disabled}
                      selected={this.props.checked === item.definedCode}
                      value={item.definedCode}
                    >
                      {item.definedName}
                    </option>
                  )
                })
              : null}
          </select>
        </div>
      </div>
    )
  }
}
