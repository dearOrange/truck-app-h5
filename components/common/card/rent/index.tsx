import React, { Component } from 'react'

import Router from 'next/router'

import Content from './content'
import Preivew from './preview'

import Style from './index.scss'

interface Props {
  data: any
}
export default class RentCard extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
  static defaultProps = {
    data: {}
  }
  render() {
    const { data } = this.props
    return (
      <>
        <div
          className={Style.card}
          onClick={() => {
            Router.push('/rent/detail?id=' + data.relatedDataUkid)
          }}
        >
          <Preivew
            // url={data.photoUrls}
            text={data.stockTypeName}
            mark={data.urgentRent}
          />
          <Content data={data} />
        </div>
      </>
    )
  }
}
