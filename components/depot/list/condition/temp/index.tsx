import React from 'react'

import withButton from '@components/common/filter-bar/__hoc/withButton'
import Radio from '@components/common/radio'

import { ConditionComponent } from '../__assist'

import TEMPERATURE from '@constant/temperature'
interface State {
  temperatureMin: string
  temperatureMax: string
}

class Temp extends ConditionComponent<any, State> {
  private get temperature(): string {
    let { temperatureMin, temperatureMax } = this.state
    return `${temperatureMin}${temperatureMax ? ',' + temperatureMax : ''}`
  }

  state = {
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

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default withButton(Temp)
