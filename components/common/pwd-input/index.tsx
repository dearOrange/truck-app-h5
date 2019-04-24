import React, { Component } from 'react'
import Input from '../input'

import Style from './index.scss'

type InputTypeType = 'password' | 'text'

interface Props {
  inline?: boolean
}

interface State {
  visible: boolean
  type: InputTypeType
}

export default class PwdInput extends Component<Props, State> {
  state: State = {
    visible: false,
    type: 'password'
  }

  toggleClick = () => {
    this.setState((prevState: State) => {
      let visible = !prevState.visible
      return {
        visible,
        type: visible ? 'text' : 'password'
      }
    })
  }

  renderEye = () => {
    let { visible } = this.state
    return (
      <div className={Style.visible} onClick={this.toggleClick}>
        {visible ? (
          <svg aria-hidden="true" className="icon">
            <use xlinkHref="#icon-opened-eye" />
          </svg>
        ) : (
          <svg aria-hidden="true" className="icon">
            <use xlinkHref="#icon-closed-eye" />
          </svg>
        )}
      </div>
    )
  }

  render() {
    let { type } = this.state
    return (
      <div className={Style.pwd}>
        <Input
          {...this.props}
          type={type}
          renderInputTool={this.renderEye}
          clearable={false}
        />
      </div>
    )
  }
}
