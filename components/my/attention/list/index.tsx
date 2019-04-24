import React, { Component } from 'react'
import withListView from '@components/hoc/with-list-view'

import { fetchAvailableList, fetchInvalidList } from '@api/my/attention'
import { MY_ATTENTION_TYPE } from '@constant/my'
import Item from './item'

import Style from './index.scss'

interface Props {
  type: MY_ATTENTION_TYPE
}
class List extends Component<Props> {
  fetch = params => {
    return this.props.type === MY_ATTENTION_TYPE.EFFECTIVE
      ? fetchAvailableList(params)
      : fetchInvalidList(params)
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
