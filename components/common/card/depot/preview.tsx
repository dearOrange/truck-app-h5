import React, { Component } from 'react'
import Style from './index.scss'
interface Props {
  url?: string
}
export default class Preview extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  private get previewImageUrl(): string {
    return this.props.url ? this.props.url : '/static/img/banner1.jpg'
  }

  render() {
    return (
      <>
        <div className={Style.preview}>
          <img src={this.previewImageUrl} alt="图片" />
        </div>
      </>
    )
  }
}
