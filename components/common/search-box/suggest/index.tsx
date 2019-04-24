import React, { Component } from 'react'

import Style from './index.scss'
import { isEmpty } from 'lodash'

import SuggestItem from './item'

import { SuggestItemModel } from './model'

interface Props {
  sug: string
}

interface State {
  list: SuggestItemModel[]
}

class Suggest extends Component<Props, State> {
  private get shown(): boolean {
    return !isEmpty(this.props.sug)
  }

  private getList(): SuggestItemModel[] {
    // TODO RXjs
    let item: SuggestItemModel = {
      label: '名称',
      city: '杭州市',
      address: '未来科技城',
      count: 10
    }

    return [...new Array(20)].map((i, index) => {
      return {
        ...item,
        label: `名称${index + 1}`
      }
    })
  }

  render() {
    let list = this.getList()

    return this.shown ? (
      <div className={Style.suggest}>
        {list.map((item, index) => {
          return <SuggestItem item={item} key={index} />
        })}
      </div>
    ) : null
  }
}

export default Suggest
