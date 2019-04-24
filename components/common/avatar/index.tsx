import React, { Component } from 'react'
import classnames from 'classnames'

import Style from './index.scss'

interface Props {
  url?: string
  size?: number
  borderless?: boolean
}

class Avatar extends Component<Props> {
  state = {
    avatarUrl: this.props.url
  }

  private get dimension(): { width: string; height: string } | {} {
    let { size } = this.props

    if (size) {
      return {
        width: `${size}rem`,
        height: `${size}rem`
      }
    } else {
      return {}
    }
  }

  render() {
    return (
      <div
        className={classnames(Style.avatar, {
          [Style.borderless]: this.props.borderless
        })}
      >
        <div
          className={Style.inner}
          style={{
            ...this.dimension
          }}
        >
          {this.props.url ? (
            <img src={this.props.url} alt="头像" />
          ) : (
            <svg aria-hidden="true" className="icon">
              <use xlinkHref="#icon-avatar" />
            </svg>
          )}
        </div>
      </div>
    )
  }
}

export default Avatar
