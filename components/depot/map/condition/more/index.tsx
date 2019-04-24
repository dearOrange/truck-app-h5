import React from 'react'
import withButton from '@components/common/filter-bar/__hoc/withButton'
import Radio from '@components/common/radio'

import { ConditionComponent } from '../__assist'
import TEMPERATURE from '@constant/temperature'

import Style from './index.scss'

interface State {
  priceMin: string
  priceMax: string
  emptyCapacityMin: string
  emptyCapacityMax: string
  temperatureMin: string
  temperatureMax: string
}

class Condition extends ConditionComponent<any, State> {
  private get price(): string {
    let { priceMin, priceMax } = this.state
    return `${priceMin}${priceMax ? ',' + priceMax : ''}`
  }

  private get emptyCapacity(): string {
    let { emptyCapacityMin, emptyCapacityMax } = this.state
    return `${emptyCapacityMin}${
      emptyCapacityMax ? ',' + emptyCapacityMax : ''
    }`
  }

  private get temperature(): string {
    let { temperatureMin, temperatureMax } = this.state
    return `${temperatureMin}${temperatureMax ? ',' + temperatureMax : ''}`
  }

  state: State = {
    priceMin: '',
    priceMax: '',
    emptyCapacityMin: '',
    emptyCapacityMax: '',
    temperatureMin: '',
    temperatureMax: ''
  }

  private onTempChange = (temperature: string) => {
    let [temperatureMin, temperatureMax = ''] = temperature.split(',')
    this.setState({ temperatureMin, temperatureMax })
  }

  private onTempRangeChange = ([temperatureMin, temperatureMax]: string[]) => {
    this.setState({ temperatureMin, temperatureMax })
  }
  private onEmptyCapacityChange = (emptyCapacity: string) => {
    let [emptyCapacityMin, emptyCapacityMax = ''] = emptyCapacity.split(',')
    this.setState({ emptyCapacityMin, emptyCapacityMax })
  }

  private onPriceChange = (price: any) => {
    let [priceMin, priceMax = ''] = price.split(',')
    this.setState({ priceMin, priceMax })
  }

  private onPriceRangeChange = ([priceMin, priceMax]: any[]) => {
    this.setState({ priceMin, priceMax })
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
          <Radio label="库容选择（吨）">
            <Radio.Option
              label="1000以下"
              value="0,1000"
              checked={this.emptyCapacity === '0,1000'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="1000-4000"
              value="1000,4000"
              checked={this.emptyCapacity === '1000,4000'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="4000-10000"
              value="4000,10000"
              checked={this.emptyCapacity === '4000,10000'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="10000以上"
              value="10000"
              checked={this.emptyCapacity === '10000'}
              onChange={this.onEmptyCapacityChange}
            />
          </Radio>
        </div>
        <div className={Style.item}>
          <Radio
            label="温度区间（℃）"
            range
            rangeLable="温度"
            rangeInitial={['', '']}
            onRangeChange={this.onTempRangeChange}
          >
            <Radio.Option
              label="速冻库"
              value={TEMPERATURE.SD}
              checked={this.temperature === TEMPERATURE.SD}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="低温库"
              value={TEMPERATURE.DW}
              checked={this.temperature === TEMPERATURE.DW}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="冷藏库"
              value={TEMPERATURE.LC}
              checked={this.temperature === TEMPERATURE.LC}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="保鲜库"
              value={TEMPERATURE.BX}
              checked={this.temperature === TEMPERATURE.BX}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="恒温库"
              value={TEMPERATURE.HW}
              checked={this.temperature === TEMPERATURE.HW}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="其他"
              value={TEMPERATURE.QT}
              checked={this.temperature === TEMPERATURE.QT}
              onChange={this.onTempChange}
            />
          </Radio>
        </div>
      </>
    )
  }
}

export default withButton(Condition)
