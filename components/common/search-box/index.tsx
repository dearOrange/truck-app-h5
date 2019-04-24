import React, { Component } from 'react'
import classnames from 'classnames'
import { isBoolean, isNumber } from 'lodash'

import Back from '@components/common/back'

import Suggest from './suggest'
import Search from './search'

import Style from './index.scss'

interface State {
  sug: string
}

interface Props {
  bgColor?: string
  noButton?: boolean
  noLabel?: boolean
  backable?: boolean
  sticky?: boolean | number
}

class SearchBox extends Component<Props, State> {
  get boxStyle(): object {
    let propsStyle = {}

    let sticky = this.props.sticky
    let stickyStyle = {}
    let defaultStickyStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 999
    }
    if (isBoolean(sticky) && sticky) {
      stickyStyle = defaultStickyStyle
    } else if (isNumber(sticky)) {
      stickyStyle = {
        ...defaultStickyStyle,
        top: `${sticky}px`
      }
    }

    let style: any = {
      ...propsStyle,
      ...stickyStyle
    }

    if (this.props.bgColor) {
      style['backgroundColor'] = this.props.bgColor
    }

    return style
  }

  private get isSticky(): boolean {
    let sticky = this.props.sticky
    let bool = false
    if ((isBoolean(sticky) && sticky) || isNumber(sticky)) {
      bool = true
    }
    return bool
  }

  state = {
    sug: ''
  }

  onSearchChange = (value: string) => {
    this.setState({ sug: value })
  }

  render() {
    return (
      <div
        className={classnames(Style.box, {
          [Style['box--sticky']]: this.isSticky
        })}
        style={{
          ...this.boxStyle
        }}
      >
        {this.props.backable ? (
          <div className={Style.back}>
            <Back />
          </div>
        ) : null}

        <Search
          noLabel={this.props.noLabel}
          noButton={this.props.noButton}
          onChange={this.onSearchChange}
        />
        <Suggest sug={this.state.sug} />
      </div>
    )
  }
}

export default SearchBox
