import React, { Component } from 'react'
import ProfileStyle from './index.scss'
import { fmtDate } from '@utils/date'
interface Props {
  data: any
}
export default class index extends Component<Props> {
  render() {
    const { data } = this.props
    return (
      <>
        <div className={ProfileStyle.profile}>
          <div className={ProfileStyle.profile_img}>
            <img src="/static/img/touxiang.png" alt="头像" />
          </div>
          <div className={ProfileStyle.profile_desc}>
            <p>{data.createUserName}</p>
            <span>注册时间：{fmtDate(data.registrationTime)}</span>
            <p>
              <span>{data.total}人关注</span>
              <span>{data.total}次发布</span>
            </p>
          </div>
          {data.realNameCertified === 1 ? (
            <svg aria-hidden="true">
              <use xlinkHref="#icon-icon" />
            </svg>
          ) : null}
        </div>
      </>
    )
  }
}
