import React from 'react'

import Head from 'next/head'
import App, { Container } from 'next/app'

import withReduxStore from '@hoc/with-redux-store'
import { Provider } from 'react-redux'

import './app.css'

class CoolinkApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
          <title>仓货车平台</title>
          <script src="/static/js/rem.js" />
          <script src="//at.alicdn.com/t/font_987443_qyxj534dip.js" />
          <script src="//cdn.bootcss.com/eruda/1.5.2/eruda.min.js" />
          {/* <script>eruda.init();</script> */}
        </Head>
        <Container>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </div>
    )
  }
}

export default withReduxStore(CoolinkApp)
