import React, { Component } from 'react'
import Item from './item'

import withListView from '@components/hoc/with-list-view'

import { fetchList } from '@api/rent'
import Style from './index.scss'

interface Props {
  params: any
}
class List extends Component<Props> {
  render() {
    let ListView = withListView(Item, {
      api: fetchList,
      params: {
        ...this.props.params,
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
