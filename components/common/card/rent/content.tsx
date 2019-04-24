import React, { Component } from 'react'
import { format } from 'date-fns'

import TextPosition from '@components/common/text-position'
import TextTag from '@components/common/text-tag'
import TextValue from '@components/common/text-value'
import Whitespace from '@components/common/whitespace'

import { joinPosition } from '@utils/index'

import Style from './index.scss'
interface Props {
  data: any
}
export default class Content extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  private get position(): string {
    return joinPosition(this.props.data)
  }

  render() {
    const { data } = this.props
    return (
      <div className={Style.content}>
        <TextPosition label={this.position} />
        <Whitespace size={0.2} />
        <TextValue label={'需求面积'} text={data.demandArea + '㎡'} />
        <Whitespace size={0.2} />
        <TextValue
          label={'期望价格'}
          text={
            data.expectedPriceType === 'N'
              ? data.expectedPriceTypeName
              : data.expectedPriceBegin +
                '-' +
                data.expectedPriceEnd +
                ' ' +
                data.stockPriceUnitName
          }
        />
        <Whitespace size={0.2} />
        <TextValue
          label={'计划入住'}
          text={format(data.planEnterDate, 'YYYY年MM月DD日')}
        />
        <Whitespace size={0.2} />
        <div className={Style.tags}>
          {data.realNameCertified === 1 ? (
            <TextTag
              label={'个人认证'}
              color={'#fb8a81'}
              classNames={Style.tagItem}
            />
          ) : null}
        </div>
      </div>
    )
  }
}
