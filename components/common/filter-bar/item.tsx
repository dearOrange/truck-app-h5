import React, { Component } from 'react'

import classnames from 'classnames'
import { uniqueId } from 'lodash'

import Style from './index.scss'
export interface Props {
  label?: string
  // type: string
  iconable?: boolean
  labelRender?: () => React.ReactNode
  contentRender?: () => React.ReactNode
  onPick?: (obj: { id: number; type: string; item: Item }) => void
  matchId?: number
  children?: React.ReactNode
}

interface State {
  on: boolean
  id: number
  pid?: number
}

class Item extends Component<Props, State> {
  private _id = uniqueId('__coolink_filter_bar__')

  state = {
    on: false,
    id: Date.now() * Math.random()
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let { matchId } = nextProps
    let { pid, id: prevId, on: prevOn } = prevState
    let state = {
      pid: matchId
    }
    if (matchId && matchId !== -1) {
      if (matchId === prevId) {
        return {
          ...state,
          on: prevOn ? true : matchId !== pid
        }
      } else {
        if (prevOn) {
          return {
            ...state,
            on: false
          }
        }
      }
    }
    return null
  }

  shouldComponentUpdate(nextProps: Props, nextState: any) {
    let { on: curOn } = this.state
    let { on: nextOn } = nextState
    return curOn !== nextOn
  }

  onClick = () => {
    this.setState((prev: State) => {
      if (!prev.on) {
        this.props.onPick &&
          this.props.onPick({
            item: this,
            id: prev.id,
            type: this._id
          })
      }

      return {
        on: !prev.on
      }
    })
  }

  onMaskClick = () => {
    this.hide()
  }

  private hide = () => {
    this.setState({
      on: false
    })
  }

  render() {
    let hasChildren = !!this.props.children
    return (
      <>
        <div
          className={classnames(Style.filterItem, {
            [Style.on]: this.state.on
          })}
          onClick={this.onClick}
        >
          <span className={Style.label}>
            {this.props.labelRender
              ? this.props.labelRender()
              : this.props.label}
          </span>

          {this.props.iconable ? (
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-xiashangjiao" />
            </svg>
          ) : null}
        </div>

        {this.state.on && hasChildren ? (
          <>
            <div className={Style.filterContent}>
              <div className={Style.mask} onClick={this.onMaskClick} />
              <div className={Style.wrap}>{this.props.children}</div>
            </div>
          </>
        ) : null}
      </>
    )
  }
}

export default Item
