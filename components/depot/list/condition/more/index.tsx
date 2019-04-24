import React from 'react'
import withButton from '@components/common/filter-bar/__hoc/withButton'
import Radio from '@components/common/radio'

import { ConditionComponent } from '../__assist'
import withDictRadio from '../__hoc/with-dict-radio'

import Style from './index.scss'

let PlatformRadio = withDictRadio('PlatformType')

interface State {
  priceMin: string
  priceMax: string
  emptyAreaMin: string
  emptyAreaMax: string
  platformType: any
}

class More extends ConditionComponent<any, State> {
  private get price(): string {
    let { priceMin, priceMax } = this.state
    return `${priceMin}${priceMax ? ',' + priceMax : ''}`
  }

  private get emptyArea(): string {
    let { emptyAreaMin, emptyAreaMax } = this.state
    return `${emptyAreaMin}${emptyAreaMax ? ',' + emptyAreaMax : ''}`
  }

  state: State = {
    priceMin: '',
    priceMax: '',
    emptyAreaMin: '',
    emptyAreaMax: '',
    platformType: ''
  }

  private onPriceChange = (price: any) => {
    let [priceMin, priceMax = ''] = price.split(',')
    this.setState({ priceMin, priceMax })
  }

  private onPriceRangeChange = ([priceMin, priceMax]: any[]) => {
    this.setState({ priceMin, priceMax })
  }

  private onAreaChange = (emptyArea: any) => {
    let [emptyAreaMin, emptyAreaMax = ''] = emptyArea.split(',')
    this.setState({ emptyAreaMin, emptyAreaMax })
  }
  private onPlatformChange = (platformType: any) => {
    this.setState({ platformType })
  }

  render() {
    return (
      <>
        <div className={Style.item}>
          <Radio
            label="价格区间（元）"
            range
            rangeLable="价格"
            rangeInitial={['', '']}
            onRangeChange={this.onPriceRangeChange}
          >
            <Radio.Option
              label="3元以下"
              value="0,3"
              checked={this.price === '0,3'}
              onChange={this.onPriceChange}
            />
            <Radio.Option
              label="3-5元"
              value="3,5"
              checked={this.price === '3,5'}
              onChange={this.onPriceChange}
            />
            <Radio.Option
              label="5-8元"
              value="5,8"
              checked={this.price === '5,8'}
              onChange={this.onPriceChange}
            />
            <Radio.Option
              label="8-12元"
              value="8,12"
              checked={this.price === '8,12'}
              onChange={this.onPriceChange}
            />
            <Radio.Option
              label="12元以上"
              value="12"
              checked={this.price === '12'}
              onChange={this.onPriceChange}
            />
            <Radio.Option
              label="其他"
              value=""
              checked={this.price === ''}
              onChange={this.onPriceChange}
            />
          </Radio>
        </div>
        <div className={Style.item}>
          <Radio label="面积（㎡）">
            <Radio.Option
              label="1000㎡以下"
              value="0,1000"
              checked={this.emptyArea === '0,1000'}
              onChange={this.onAreaChange}
            />
            <Radio.Option
              label="1000-3000㎡"
              value="1000,3000"
              checked={this.emptyArea === '1000,3000'}
              onChange={this.onAreaChange}
            />
            <Radio.Option
              label="3000-6000㎡"
              value="3000,6000"
              checked={this.emptyArea === '3000,6000'}
              onChange={this.onAreaChange}
            />
            <Radio.Option
              label="6000-10000㎡"
              value="6000,10000"
              checked={this.emptyArea === '6000,10000'}
              onChange={this.onAreaChange}
            />
            <Radio.Option
              label="10000㎡以上"
              value="10000"
              checked={this.emptyArea === '10000'}
              onChange={this.onAreaChange}
            />
            <Radio.Option />
          </Radio>
        </div>

        <div className={Style.item}>
          <PlatformRadio
            label="卸货平台"
            optionRender={(data: any) => {
              return (
                <Radio.Option
                  label={data.definedName}
                  value={data.definedCode}
                  checked={this.state.platformType === data.definedCode}
                  onChange={this.onPlatformChange}
                />
              )
            }}
          />
        </div>
      </>
    )
  }
}

export default withButton(More)
