import React, { Component } from 'react'
import Router from 'next/router'

import { confirm } from '@utils/index'

import Style from './index.scss'
interface Props {
  data: any
}
class Bottom extends Component<Props> {
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

  render() {
    const { data } = this.props
    return (
      <div className={Style.bottom}>
        <div className={Style.inner}>
          <div className={Style.contact} onClick={this.doContact}>
            <svg aria-hidden="true" className="icon">
              <use xlinkHref="#icon-dianhua" />
            </svg>
            <div className={Style.contactContent}>
              <span className={Style.phone}>
                {data.ptStockPublish.serviceUserMobile}
              </span>
              <span>{data.ptStockPublish.serviceUserName}</span>
            </div>
          </div>
          <div
            className={Style.appoint}
            onClick={() => {
              Router.push({
                pathname: `/appoint`,
                query: {
                  id: data.ptStockPublish.stockPublishUkid
                }
              })
            }}
          >
            免费预约
          </div>
        </div>
      </div>
    )
  }
}

export default Bottom
