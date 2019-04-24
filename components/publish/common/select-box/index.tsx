import React, { Component } from 'react'
import Style from './index.scss'
import Checkbox from '@components/publish/common/checkbox'
interface Props {
  definedCode: string
  definedName: string
  onChange?: (value: any, checked: boolean) => void
  // batchItem: { id: any; selected: boolean }
}
interface State {
  selected: boolean
}

export default class index extends Component<Props, State> {
  state = {
    selected: false
  }
  get isSelected(): boolean {
    return this.state.selected
  }

  onChange = (checked: boolean) => {
    this.props.onChange && this.props.onChange(this.props.definedCode, checked)
    this.setState({ selected: this.isSelected ? false : true })
  }
  render() {
    return (
      <>
        <div className={Style.selectableItem}>
          <div className={Style.checkbox}>
            <Checkbox
              iniChecked={this.state.selected}
              onChange={this.onChange}
            />
          </div>
          <div className={Style.content}>{this.props.definedName}</div>
        </div>
      </>
    )
  }
}
