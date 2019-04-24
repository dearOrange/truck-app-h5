import React, { Component } from 'react'
import Style from './index.scss'

interface Props {
  label: string
  desc?: string
  icon: string
}
export default class Preview extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
  static defaultProps = {
    desc: ''
  }
  render() {
    const { label, desc, icon } = this.props
    return (
      <>
        <div className={Style.info}>
          <svg aria-hidden="true">
            <use xlinkHref={icon} />
          </svg>
          <div className={Style.fl}>
            <p>{label}</p>
            <div className={Style.fr}>
              <p>{desc}</p>
              <svg aria-hidden="true">
                <use xlinkHref="#icon-jiantou" />
              </svg>
            </div>
          </div>
        </div>
      </>
    )
  }
}
