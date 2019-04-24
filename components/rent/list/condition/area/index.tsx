import React from 'react'
import withButton from '@components/common/filter-bar/__hoc/withButton'
import { PickerView } from 'antd-mobile'

import { ConditionComponent } from '../__assist'

import { getProviceCity } from '@utils/area'

interface Model {
  provinceCode: string
  cityCode: string
}

class Area extends ConditionComponent<any, Model> {
  private list: any[] = getProviceCity()

  constructor(props) {
    super(props)

    this.state = {
      provinceCode: '',
      cityCode: ''
    }
  }

  onChange = (value: any) => {
    let [provinceCode, cityCode] = value
    this.setState({
      provinceCode,
      cityCode
    })
  }

  render() {
    let { provinceCode, cityCode } = this.state

    return (
      <PickerView
        onChange={this.onChange}
        data={this.list}
        value={[provinceCode, cityCode]}
        cols={2}
      />
    )
  }
}

export default withButton(Area)
