import React, { Component } from 'react'
import classnames from 'classnames'

import { TYPE } from './type'

import Style from './index.scss'

interface Props {
  onTabChange: (type: TYPE) => void
}

export default class RecommendTab extends Component<Props> {
  private type: TYPE = TYPE.DEPOT // 出租/求租

  private switchRentedList = () => {
    let { type } = this
    if (type !== TYPE.DEPOT) {
      this.type = TYPE.DEPOT
      this.select()
    }
  }
  private switchRentableList = () => {
    let { type } = this
    if (type !== TYPE.RENT) {
      this.type = TYPE.RENT
      this.select()
    }
  }
  private async select() {
    let { type } = this
    this.props.onTabChange(type)
  }

  componentDidMount() {
    this.select()
  }

  render() {
    let type = this.type

    return (
      <div className={Style.tab}>
        <span
          onClick={this.switchRentedList}
          className={classnames(Style.tabItem, {
            [Style.active]: type === TYPE.DEPOT
          })}
        >
          冷库出租
        </span>
        <span
          onClick={this.switchRentableList}
          className={classnames(Style.tabItem, {
            [Style.active]: type === TYPE.RENT
          })}
        >
          冷库求租
        </span>
      </div>
    )
  }
}
