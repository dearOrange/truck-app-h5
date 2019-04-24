import React, { Component } from 'react'

import classnames from 'classnames'
import Style from './index.scss'

interface Props {
  data: any
  onChange?: (val: string) => void
  inline?: boolean
  initValue?: string
}
interface State {}
export default class Select extends Component<Props, State> {
  static defaultProps = {
    onChange: () => {}
  }

  state = {
    value: this.props.initValue || ''
    // rows: 1,
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (snapshot && snapshot.rows) {
    //   this.setState({
    //     rows: snapshot.rows
    //   })
    // }
  }

  private onChange = (event: any) => {
    let inputValue = event.target.value
    this.setState(() => {
      this.props.onChange && this.props.onChange(inputValue)
    })
  }

  render() {
    return (
      <div className={classnames(Style.inputBox)}>
        <div className={classnames(Style.inputField)}>
          <select onChange={this.onChange}>
            <option value="">请选择</option>
            {this.props.data
              ? this.props.data.map((item: any, index: number) => {
                  return (
                    <option key={index} value={item.areaId}>
                      {item.areaName}
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
