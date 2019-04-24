import React from 'react'

import NewsCard from '@components/news/list/card'

import Style from './index.scss'

export default function Item(props) {
  return (
    <div className={Style.item}>
      <NewsCard />
    </div>
  )
}
