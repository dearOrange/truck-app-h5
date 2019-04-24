import React, { Component } from 'react'
import Style from './index.scss'

interface Props {
  text: string
}
export default class index extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { text } = this.props
    return (
      <>
        <div className={Style.serve}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-chenggong" />
          </svg>
          <span className={Style.text}>{text}</span>
        </div>
      </>
    )
  }
}
