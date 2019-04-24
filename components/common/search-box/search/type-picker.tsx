import React, { Component } from 'react'
import { ActionSheet } from 'antd-mobile'

import Style from './index.scss'

interface Type {
  text: string
  value: any
}

interface State {
  type: string
}

interface Props<T> {
  onPicker: (type: T) => void
}

class TypePicker extends Component<Props<Type>, State> {
  private TYPES: Type[] = [
    {
      text: '冷库',
      value: 0
    },
    {
      text: '货源',
      value: 1
    }
  ]

  state = {
    type: this.getTypeText(0)
  }

  private getTypeText(index: number): string {
    return this.TYPES[index].text
  }

  private getType(index: number): Type {
    return this.TYPES[index]
  }

  onPicker = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: this.TYPES.map((type, index) => {
          return `找${this.getTypeText(index)}`
        }),
        message: '选择搜索类型',
        maskClosable: true
      },
      (index: number) => {
        if (index !== -1) {
          this.setState({ type: this.getTypeText(index) })
          this.props.onPicker(this.getType(index))
        }
      }
    )
  }

  render() {
    return (
      <span className={Style.label} onClick={this.onPicker}>
        {this.state.type}
      </span>
    )
  }
}

export default TypePicker
