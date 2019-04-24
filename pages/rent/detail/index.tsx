import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'

import withPrefetch from '@hoc/with-prefetch'
import Box from '@components/common/box'
import Whitespace from '@components/common/whitespace'
import Recommend from '@components/common/recommend'
import Header from '@components/common/header'
import Intro from '@components/rent/detail/intro'
import RentRecommend from '@components/rent/detail/recommend'
import Bottom from '@components/rent/detail/bottom'
import { fetchRentRecommend } from '@api/recommend'
import { fetchDetail } from '@api/rent'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

class RentDetail extends Component<any, any> {
  state = {
    detailData: null
  }

  getRecommendList = () => {
    return fetchRentRecommend(5, 330100)
  }
  render() {
    const { data: detailData } = this.props
    return (
      <>
        <Header title="求租详情" textColor="white" />
        <div className={Style.content}>
          <Intro data={detailData} />
          <Whitespace size={0.5} />
          <Box
            title="冷库需求推荐"
            right={{
              text: '查看更多',
              link: '/rent/list'
            }}
          >
            <Recommend
              dataLoader={this.getRecommendList}
              itemRender={data => <RentRecommend.Item data={data} />}
              containerRender={children => (
                <RentRecommend.Container>{children}</RentRecommend.Container>
              )}
            />
          </Box>
        </div>
        <Bottom data={detailData} />
      </>
    )
  }
}

const Detail = withRouter((props: any) => {
  let id = props.router.query.id
  let _RentDetail = withAuth()(withPrefetch(fetchDetail, id)(RentDetail))
  return <_RentDetail />
})

export default Detail
