import React, { Component } from 'react'
import Style from './index.scss'

interface Props {
  label: string
  text: string
}

export default class index extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <div className={Style['text-value']}>
          <span className={Style.text}>{this.props.label}</span>
          <span className={Style.value}>{this.props.text}</span>
        </div>
      </>
    )
  }
}
