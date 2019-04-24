import React from 'react'
import Link from 'next/link'
import Style from './index.scss'

export default function News(props: any) {
  return (
    <>
      <Link href={props.data.link}>
        <a
          className={Style.news}
          style={{
            background: 'url(' + props.data.url + ') no-repeat center center'
          }}
        >
          <p className={Style.newsTitle}>{props.data.title}</p>
          <p className={Style.newsDesc}>{props.data.label}</p>
        </a>
      </Link>
    </>
  )
}
