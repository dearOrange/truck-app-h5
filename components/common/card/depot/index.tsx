import React, { Component } from 'react'
import Router from 'next/router'

import Content from './content'
import Preivew from './preview'

import Style from './index.scss'

interface Props {
  data: any
  borderless?: boolean
}

export default class DepotCard extends Component<Props> {
  // private get previewUrl(): string {
  //   let depotData = this.props.data
  //   let previewPhoto = '' // TODO 默认图片
  //   if (depotData) {
  //     let photos = depotData.ptStockPublish.photoUrls
  //     let hasPhoto = !!photos
  //     if (hasPhoto) {
  //       previewPhoto = photos.split(',')[0]
  //     }
  //   }
  //   return previewPhoto
  // }

  render() {
    const { data } = this.props
    return (
      <>
        <div
          className={Style.card}
          onClick={() => {
            Router.push('/depot/detail?id=' + data.relatedDataUkid)
          }}
        >
          <Preivew url={data.photoUrl} />
          <Content data={data} />
        </div>
      </>
    )
  }
}
