import React, { Component } from 'react'
import Router from 'next/router'

import { confirm } from '@utils/index'
import { addFollow } from '@api/common/follow'

import Style from './index.scss'
interface Props {
  data: any
}

class Bottom extends Component<Props> {
  private followed = this.props.data.isFollow === '已关注' ? true : false
  state = {
    isFollow: this.followed
  }
  doContact = () => {
    confirm(
      '13256568745',
      function() {
        // TODO
        console.log('TODO 打电话')
      },
      {
        text: '呼叫'
      }
    )
  }
  private async follow(id: any) {
    let data = {
      relatedDataType: 'SR',
      relatedDataUkid: id
    }
    // let {success} = await addFollow(data)
    // if(success){
    //   this.setState({
    //     isFollow: true
    //   })
    // }
    this.setState({
      isFollow: !this.state.isFollow
    })
  }
  render() {
    const { data } = this.props
    const { isFollow } = this.state
    return (
      <div className={Style.bottom}>
        <div className={Style.inner}>
          <div className={Style.contact} onClick={this.doContact}>
            <svg aria-hidden="true" className="icon">
              <use xlinkHref="#icon-dianhua" />
            </svg>
            <div className={Style.contactContent}>
              <span className={Style.phone}>{data.mobileNumber}</span>
              <span>{data.userName}</span>
            </div>
          </div>
          <div
            className={Style.follow}
            onClick={this.follow.bind(this, this.props.data.stockDemandUkid)}
          >
            <svg>
              <use
                xlinkHref={isFollow ? '#icon-shoucang1' : '#icon-shoucang'}
              />
            </svg>
            <span className={Style.text}>{isFollow ? '已关注' : '关注'}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Bottom
