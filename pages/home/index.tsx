import React from 'react'

import HomeBanner from '@components/home/banner'
import HomeFind from '@components/home/find'
import HomeInfo from '@components/home/information'
import Recommend from '@components/home/recommend'

import Box from '@components/common/box'
import Whitespace from '@components/common/whitespace'
import HomeTeam from '@components/common/team'
import SearchBox from '@components/common/search-box'

import withTabbar from '@hoc/with-tabbar'
import withAuth from '@hoc/with-auth'

import Style from './index.scss'

function Home() {
  return (
    <>
      <div className={Style.home}>
        <div className={Style.banner}>
          {/* <SearchBox
            noButton={true}
            noLabel={true}
            sticky={20}
            bgColor={'transparent'}
          /> */}
          <HomeBanner />
        </div>
        <div className={Style.content}>
          <Box>
            <HomeFind />
          </Box>
          <Whitespace size={0.5} />
          <Box
            title="行业资讯"
            right={{
              text: '查看全部',
              link: '/news/list'
            }}
          >
            <HomeInfo />
          </Box>
          <Whitespace size={0.5} />
          <Recommend />
          <Whitespace size={0.5} />
          <Box>
            <HomeTeam />
          </Box>
        </div>
      </div>
    </>
  )
}

export default withAuth()(withTabbar(Home))
