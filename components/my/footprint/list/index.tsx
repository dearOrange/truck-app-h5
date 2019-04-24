import React, { Component } from 'react'
import classnames from 'classnames'

import withListView from '@components/hoc/with-list-view'
import Whitespace from '@components/common/whitespace'

import { fetchFootprintList } from '@api/my/footprint'
import Item from './item'
import { format } from 'date-fns'

import Style from './index.scss'

interface Props {}

function Body(props) {
  return (
    <div className={classnames('am-list-body', Style.body)}>
      <Whitespace size={0.3} />
      {props.children}
    </div>
  )
}

class List extends Component<Props> {
  fetch = params => {
    return fetchFootprintList(params)
  }

  render() {
    let ListView = withListView(
      Item,
      {
        api: this.fetch,
        params: {
          pageSize: 10
        }
      },
      {
        sectionId: 'date',
        renderSectionHeader: (data, sectionID) => {
          return (
            <>
              <div key={sectionID} className={Style.head}>
                {'访问时间:' +
                  format(data.myDataCenterObject.createTime, 'YYYY年MM月DD日')}
              </div>
            </>
          )
        },
        renderSectionWrapper: (sectionID: any) => {
          return <div key={`wrap${sectionID}`} className={Style.wrap} />
        },
        renderBodyComponent: () => {
          return <Body />
        }
      }
    )
    return (
      <div className={Style.list}>
        <ListView />
      </div>
    )
  }
}

export default List
