import React, { Component } from 'react'
import { isEmpty } from 'lodash'

import withPrefetch from '@hoc/with-prefetch'
import Item from './item'
import { confirm } from '@utils/index'
import { HistoryItemModel } from './model'
import Empty from '@components/common/empty'

import Style from './index.scss'

interface State {
  list: HistoryItemModel[]
}

class History extends Component<any, State> {
  state = {
    list: [...new Array(10)].map(() => {
      return {
        label: '历史记录',
        id: Math.random()
      }
    })
  }

  get isEmpty(): boolean {
    return isEmpty(this.state.list)
  }

  deleteAll = async () => {
    function doDelete() {
      console.log('TODO 删除')
      return true
    }
    let { ok } = await confirm('确认删除全部历史记录', doDelete)
    if (ok) {
      this.setState({ list: [] })
    }
  }

  render() {
    return (
      <div className={Style.history}>
        {this.isEmpty ? (
          <Empty />
        ) : (
          <>
            <div className={Style.title}>
              <span className={Style.text}>历史搜索</span>
              <svg className="icon" aria-hidden="true" onClick={this.deleteAll}>
                <use href="#icon-shanchu" />
              </svg>
            </div>
            <div className={Style.list}>
              {this.state.list.map(item => {
                return <Item item={item} key={item.id} />
              })}
            </div>
          </>
        )}
      </div>
    )
  }
}

export default withPrefetch({ url: '/xx/aaa' })(History)
