import React, { Component } from 'react'

import Style from './index.scss'

interface Props {
  label: string
}
export default class index extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { label } = this.props
    return (
      <>
        <div className={Style.position}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-dingwei" />
          </svg>
          <div className={Style.content}>{label}</div>
        </div>
      </>
    )
  }
}
