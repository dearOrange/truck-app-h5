import React from 'react'
import withButton from '@components/common/filter-bar/__hoc/withButton'
import Radio from '@components/common/radio'
import { ConditionComponent } from '../__assist'

interface Model {
  planEnter?: string
}

class Volume extends ConditionComponent<any, Model> {
  state = {
    planEnter: ''
  }

  private onEmptyCapacityChange = (planEnter: any) => {
    this.setState({ planEnter })
  }

  render() {
    return (
      <>
        <Radio label="入住时间">
          <Radio.Option
            label="一周内"
            value="7"
            checked={this.state.planEnter === '7'}
            onChange={this.onEmptyCapacityChange}
          />
          <Radio.Option
            label="两周内"
            value="14"
            checked={this.state.planEnter === '14'}
            onChange={this.onEmptyCapacityChange}
          />
          <Radio.Option
            label="一月内"
            value="30"
            checked={this.state.planEnter === '30'}
            onChange={this.onEmptyCapacityChange}
          />
        </Radio>
      </>
    )
  }
}

export default withButton(Volume)
