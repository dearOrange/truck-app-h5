import React from 'react'
import withButton from '@components/common/filter-bar/__hoc/withButton'
import Radio from '@components/common/radio'
import { ConditionComponent } from '../__assist'

interface State {
  emptyCapacityMin?: any
  emptyCapacityMax?: any
}

class Volume extends ConditionComponent<any, State> {
  private get emptyCapacity(): string {
    let { emptyCapacityMin, emptyCapacityMax } = this.state
    return `${emptyCapacityMin}${
      emptyCapacityMax ? ',' + emptyCapacityMax : ''
    }`
  }

  state = {
    emptyCapacityMin: '',
    emptyCapacityMax: ''
  }

  private onEmptyCapacityChange = (emptyCapacity: string) => {
    let [emptyCapacityMin, emptyCapacityMax = ''] = emptyCapacity.split(',')
    this.setState({ emptyCapacityMin, emptyCapacityMax })
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default withButton(Volume)
