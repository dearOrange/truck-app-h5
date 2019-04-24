import React from 'react'
import Style from './index.scss'

export default function Title(props: { title: string }) {
  let { title } = props
  return (
    <>
      <div className={Style.title}>{title}</div>
    </>
  )
}
