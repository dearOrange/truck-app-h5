import React, { Component } from 'react'

import { joinPosition } from '@utils/index'

import TextPosition from '@components/common/text-position'
import TextTag from '@components/common/text-tag'

import Title from './title'

import Style from './index.scss'
interface Props {
  data: any
}
export default class Content extends Component<Props> {
  private get position(): string {
    return joinPosition(this.props.data)
  }

  render() {
    const { data } = this.props

    return (
      <div className={Style.content}>
        <Title title={data.title} />

        <TextPosition label={this.position} />
        <div className={Style.tags}>
          {data.realNameCertified === 1 ? (
            <TextTag
              label={'个人认证'}
              color={'#fb8a81'}
              classNames={Style.tagItem}
            />
          ) : null}
        </div>
        <div className={Style.price}>
          {data.expectedPriceType === 'N'
            ? data.expectedPriceTypeName
            : data.price + data.stockPriceUnitName}
        </div>
      </div>
    )
  }
}
