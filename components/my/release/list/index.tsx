import React, { Component } from 'react'
import withListView from '@components/hoc/with-list-view'

import {
  fetchAvailableList,
  fetchInvalidList,
  fetchNoneList
} from '@api/my/release'
import { MY_RELEASE_TYPE } from '@constant/my'
import Item from './item'

import Style from './index.scss'

interface Props {
  type: MY_RELEASE_TYPE
}
class List extends Component<Props> {
  fetch = params => {
    switch (this.props.type) {
      case MY_RELEASE_TYPE.EFFECTIVE:
        return fetchAvailableList(params)
      case MY_RELEASE_TYPE.INVALID:
        return fetchInvalidList(params)
      case MY_RELEASE_TYPE.NONE:
        return fetchNoneList(params)
      default:
        return []
    }
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
