import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/css/swiper.css'

import BannerStyle from './index.scss'

import classnames from 'classnames'

interface Props {
  urls: any[]
}
export default class index extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { urls } = this.props
    return (
      <div className={classnames(BannerStyle.banner)}>
        <Swiper
          options={{
            pagination: {
              el: '.banner--preview--pagination',
              type: 'fraction'
            }
          }}
        >
          {urls.map((item, index) => {
            return (
              <div key={index} className={classnames(BannerStyle.bannerItem)}>
                <img src={item} alt={'Slide ' + index} />
              </div>
            )
          })}
        </Swiper>
        <div className="banner--preview--pagination" />
      </div>
    )
  }
}
