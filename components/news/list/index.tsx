import React, { Component } from 'react'
import withListView from '@components/hoc/with-list-view'

// import { fetchAvailableList, fetchInvalidList } from '@api/my/attention'
import { NEWS_TYPE } from '@constant/news'
import Item from './item'

import Style from './index.scss'

interface Props {
  type: NEWS_TYPE
}
class List extends Component<Props> {
  fetch = params => {
    // return this.props.type === NEWS_TYPE.HOT
    //   ? fetchAvailableList(params)
    //   : fetchInvalidList(params)

    // TODO 请求

    return Promise.resolve({
      success: true,
      data: [...Array(10)]
    })
  }

  render() {
    let ListView = withListView(Item, {
      api: this.fetch,
      params: {
        pageSize: 10
      }
    })
    return (
      <div className={Style.list}>
        <ListView />
      </div>
    )
  }
}

export default List
