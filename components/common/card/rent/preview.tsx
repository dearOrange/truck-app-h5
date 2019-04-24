import React, { Component } from 'react'
import Style from './index.scss'

interface Props {
  url?: string
  text?: string
  mark?: string
}
export default class Preview extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  static defaultProps = {
    url: '/static/img/banner1.jpg'
  }

  render() {
    return (
      <>
        <div className={Style.preview}>
          {this.props.mark ? (
            <div className={Style.mark}>
              <span>{this.props.mark}</span>
            </div>
          ) : null}

          {/* <img src={this.props.url} alt="图片" /> */}
          <span className={Style.text}>{this.props.text || '求租'}</span>
        </div>
      </>
    )
  }
}
