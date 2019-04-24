import React, { Component } from 'react'
import Style from './index.scss'

export default class Preview extends Component<any> {
  //   private get previewImageUrl(): string {
  //     return this.props.url ? this.props.url : '/static/img/banner1.jpg'
  //   }

  render() {
    return (
      <>
        <div className={Style.preview}>
          <img src="/static/img/banner1.jpg" alt="图片" />
        </div>
      </>
    )
  }
}
