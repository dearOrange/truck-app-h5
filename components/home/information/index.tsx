import React from 'react'
import News from './news'
import { NEWS_TYPE } from '@constant/news'

import Style from './index.scss'
export default function Index() {
  const newsArr = [
    {
      title: '头条新闻',
      label: '行业动态，及时掌握',
      url: '/static/img/banner1.jpg'
    },
    {
      title: '重磅数据',
      label: '行业分析报告，掌握先机',
      url: '/static/img/banner1.jpg'
    }
  ]
  return (
    <>
      <div className={Style.info}>
        <div className={Style.content}>
          <img src="/static/img/banner1.jpg" alt="图片" />
          <p className={Style.desc}>
            助力双12！打通线上线下，
            双十二经历了五年也是本地生活市场不断数字化、升数
          </p>
        </div>
        <div className={Style.newsList}>
          <News
            data={{
              title: '头条新闻',
              label: '行业动态，及时掌握',
              url: '/static/img/banner1.jpg',
              link: `/news/list?type=${NEWS_TYPE.HOT}`
            }}
          />
          <News
            data={{
              title: '重磅数据',
              label: '行业分析报告，掌握先机',
              url: '/static/img/banner1.jpg',
              link: `/news/list?type=${NEWS_TYPE.MAJOR}`
            }}
          />
        </div>
      </div>
    </>
  )
}
