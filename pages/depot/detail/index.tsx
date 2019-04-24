import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { pick } from 'lodash'

import Recommend from '@components/common/recommend'
import Header from '@components/common/header'
import Whitespace from '@components/common/whitespace'
import Box from '@components/common/box'

import Follow from '@components/depot/detail/follow'
import Banner from '@components/depot/detail/banner'
import Meta from '@components/depot/detail/meta'
import Intro from '@components/depot/detail/intro'
import Librarys from '@components/depot/detail/librarys'
import Bottom from '@components/depot/detail/bottom'
import DepotRecommend from '@components/depot/detail/recommend'

import withPrefetch from '@hoc/with-prefetch'
import { fetchDepotSelected, fetchDepotPeriphery } from '@api/recommend'
import { fetchDetail } from '@api/depot'
import { saveDetailAction } from '@store/actions/depot'
import withAuth from '@hoc/with-auth'
import { joinPosition } from '@utils/index'

import Style from './index.scss'

interface State {
  isFollow: boolean
}

class DepotDetail extends Component<any, State> {
  // constructor(props: any) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.saveDetail(this.props.data)
  }

  // 冷库精选
  getSelectedDepotList = () => {
    return fetchDepotSelected(2)
  }

  getPeripheryDepotList = () => {
    return fetchDepotPeriphery(2, 220500, 220523)
  }

  renderHeaderRight = () => {
    return (
      <>
        <Follow
          followed={!!this.props.data.isFollow}
          id={this.props.data.ptStockPublish.stockPublishUkid}
        />
        <svg className={classnames('icon')} aria-hidden="true">
          <use xlinkHref="#icon-iconzhuanfa" />
        </svg>
      </>
    )
  }

  render() {
    const { data: detailData } = this.props
    const cityAndDistrict = pick(detailData, ['city', 'district'])

    return (
      <>
        <Header
          bgColor="white"
          title={joinPosition(cityAndDistrict, '.') + '·' + detailData.stockId}
          renderHeaderRight={this.renderHeaderRight}
        />
        <Banner urls={detailData.ptStockPublish.photoUrls.split(',')} />
        <div className={Style.content}>
          <Meta data={detailData} />
          <Whitespace size={0.3} />
          <Librarys data={detailData.baStockDetailList} />
          <Whitespace size={0.5} />
          <Intro data={detailData} />
          <Whitespace size={0.5} />
          <Box
            title="冷库精选"
            right={{
              text: '查看更多',
              link: '/depot/list'
            }}
          >
            <Recommend
              dataLoader={this.getSelectedDepotList}
              itemRender={data => <DepotRecommend.Item data={data} />}
              containerRender={children => (
                <DepotRecommend.Container>{children}</DepotRecommend.Container>
              )}
            />
          </Box>
          <Whitespace size={0.5} />
          <Box
            title="周边冷库"
            right={{
              text: '查看更多',
              link: '/depot/list'
            }}
          >
            <Recommend
              dataLoader={this.getPeripheryDepotList}
              itemRender={data => <DepotRecommend.Item data={data} />}
              containerRender={children => (
                <DepotRecommend.Container>{children}</DepotRecommend.Container>
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
  let _DepotDetail = connect(
    null,
    dispatch => {
      return {
        saveDetail(data) {
          dispatch(saveDetailAction(data, id))
        }
      }
    }
  )(withAuth()(withPrefetch(fetchDetail, id)(DepotDetail)))
  return <_DepotDetail />
})

export default Detail
