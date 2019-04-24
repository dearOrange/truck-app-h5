import React from 'react'

import withButton from '@components/common/filter-bar/__hoc/withButton'
import Radio from '@components/common/radio'

import withDictRadio from '../__hoc/with-dict-radio'
import { ConditionComponent } from '../__assist'

let StockTypeRadio = withDictRadio('StockType')

interface Model {
  stockType?: any
}

class Temp extends ConditionComponent<any, Model> {
  state = {
    stockType: ''
  }

  private onStockTypeChange = (stockType: any) => {
    this.setState({ stockType })
  }

  render() {
    return (
      <>
        <StockTypeRadio
          label="仓库类型"
          optionRender={(data: any) => {
            return (
              <Radio.Option
                label={data.definedName}
                value={data.definedCode}
                checked={this.state.stockType === data.definedCode}
                onChange={this.onStockTypeChange}
              />
            )
          }}
        />
      </>
    )
  }
}

export default withButton(Temp)
