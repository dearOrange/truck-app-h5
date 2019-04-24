import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/css/swiper.css'

import BannerStyle from './index.scss'

import classnames from 'classnames'

export default class index extends Component<any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className={classnames(BannerStyle.banner)}>
        <Swiper>
          <div className={classnames(BannerStyle.bannerItem)}>
            <img src="/static/img/banner1.jpg" alt="Slide 1" />
            <div className={classnames(BannerStyle.bannerDesc)}>
              <p>找冷库 运冷货 </p>
              <p>就上 1 号冷链</p>
            </div>
          </div>
          <div className={classnames(BannerStyle.bannerItem)}>
            <img src="/static/img/banner1.jpg" alt="Slide 1" />
            <div className={classnames(BannerStyle.bannerDesc)}>
              <p>找冷库 运冷货 </p>
              <p>就上 1 号冷链</p>
            </div>
          </div>
          <div className={classnames(BannerStyle.bannerItem)}>
            <img src="/static/img/banner1.jpg" alt="Slide 1" />
            <div className={classnames(BannerStyle.bannerDesc)}>
              <p>找冷库 运冷货 </p>
              <p>就上 1 号冷链</p>
            </div>
          </div>
          <div className={classnames(BannerStyle.bannerItem)}>
            <img src="/static/img/banner1.jpg" alt="Slide 1" />
            <div className={classnames(BannerStyle.bannerDesc)}>
              <p>找冷库 运冷货 </p>
              <p>就上 1 号冷链</p>
            </div>
          </div>
        </Swiper>
      </div>
    )
  }
}
