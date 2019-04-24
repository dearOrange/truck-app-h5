import React, { Component } from 'react'

import Whitespace from '@components/common/whitespace'
import Box from '@components/common/box'

import Sort from './sort'
import Basic from './basic'
import Device from './device'
import Feature from './feature'
import Profile from './profile'

import { StickyContainer } from 'react-sticky'

import Style from './index.scss'
interface Props {
  data: any
}
class Intro extends Component<Props> {
  basicRef: any = React.createRef()
  deviceRef: any = React.createRef()
  featureRef: any = React.createRef()
  profileRef: any = React.createRef()

  private onSelect = type => {
    let ref = this[`${type}Ref`]
    if (ref) {
      let elem = ref.current
      let rect = elem.getBoundingClientRect()
      let scrollY = rect.top + window.scrollY - 100
      window.scrollTo(0, scrollY)
    }
  }

  render() {
    const { data } = this.props
    return (
      <div className={Style.intro}>
        <StickyContainer>
          <Sort onSelect={this.onSelect} />
          <Whitespace size={0.2} />
          <Box title="基本信息" ref={this.basicRef}>
            <Basic data={data} />
          </Box>
          <Whitespace size={0.5} />
          <Box title="配套设施" ref={this.deviceRef}>
            <Device data={data} />
          </Box>
          <Whitespace size={0.5} />
          <Box title="优势特点" ref={this.featureRef}>
            <Feature data={data.otherDesc} />
          </Box>
          <Whitespace size={0.5} />
          <Box title="发布人信息" ref={this.profileRef}>
            <Profile data={data} />
          </Box>
        </StickyContainer>
      </div>
    )
  }
}

export default Intro
