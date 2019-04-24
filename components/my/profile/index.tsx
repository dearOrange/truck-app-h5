import React, { Component } from 'react'
import Style from './index.scss'

import Whitespace from '@components/common/whitespace'

import Head from './head/index'
import Links from './links'

export default class Profile extends Component<any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <>
        <div className={Style.profile}>
          <Head />
          <Whitespace size={0.3} />
          <Links />
        </div>
      </>
    )
  }
}
