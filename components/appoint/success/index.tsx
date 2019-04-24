import React, { Component } from 'react'
import Style from './index.scss'

interface Props {}

export default class Success extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <div className={Style.success}>
          <img src="/static/img/success.png" alt="提交成功" />
          <h3>您的预约已成功提交</h3>
          <div className={Style.tip}>1号冷链将尽快联系您确认看库时间和地点</div>
        </div>
      </>
    )
  }
}
