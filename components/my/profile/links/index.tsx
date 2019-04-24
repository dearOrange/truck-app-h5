import React, { Component } from 'react'
import classnames from 'classnames'
import Router from 'next/router'

import ArrowButton from '@components/my/common/arrow-button'

import Style from './index.scss'

class Links extends Component {
  render() {
    return (
      <div className={Style.links}>
        <ArrowButton
          leftLabel="我的发布"
          renderHeader={() => {
            return (
              <img
                src="/static/img/publish.png"
                className={classnames('icon', Style.profileIcon)}
                alt="发布"
              />
            )
          }}
          onClick={() => {
            Router.push('/my/release')
          }}
        />
        <ArrowButton
          leftLabel="我的关注"
          renderHeader={() => {
            return (
              <img
                src="/static/img/attention.png"
                className={classnames('icon', Style.profileIcon)}
                alt="关注"
              />
            )
          }}
          onClick={() => {
            Router.push('/my/attention')
          }}
        />
        <ArrowButton
          leftLabel="我的足迹"
          renderHeader={() => {
            return (
              <img
                src="/static/img/footer.png"
                className={classnames('icon', Style.profileIcon)}
                alt="足迹"
              />
            )
          }}
          onClick={() => {
            Router.push('/my/footprint')
          }}
        />
        <ArrowButton
          leftLabel="我的认证"
          renderHeader={() => {
            return (
              <img
                src="/static/img/identify.png"
                className={classnames('icon', Style.profileIcon)}
                alt="认证"
              />
            )
          }}
          onClick={() => {
            Router.push('/my/identify')
          }}
        />
        <ArrowButton
          leftLabel="系统设置"
          renderHeader={() => {
            return (
              <img
                src="/static/img/setting.png"
                className={classnames('icon', Style.profileIcon)}
                alt="设置"
              />
            )
          }}
          onClick={() => {
            Router.push('/my/setting')
          }}
        />
      </div>
    )
  }
}

export default Links
