import React, { Component } from 'react'
import Header from '@components/news/detail/right'
import Content from '@components/news/detail/content'
import Page from '@components/news/detail/page'

class News extends Component<any, any> {
  render() {
    return (
      <>
        <Header title="行业资讯" />
        <Content />
        <Page />
      </>
    )
  }
}

export default News
