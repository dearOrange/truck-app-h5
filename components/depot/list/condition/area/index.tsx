import React from 'react'
import withButton from '@components/common/filter-bar/__hoc/withButton'
import { PickerView } from 'antd-mobile'

import { ConditionComponent } from '../__assist'

import { getProviceCityDistrict } from '@utils/area'

interface Model {
  districtCode: string
  provinceCode: string
  cityCode: string
}

class Area extends ConditionComponent<any, Model> {
  state: Model = {
    provinceCode: '',
    cityCode: '',
    districtCode: ''
  }

  private list: any[] = []
  constructor(props) {
    super(props)

    // let cityCode = '330000' // TODO
    // this.city = cityCode
    this.list = getProviceCityDistrict()
  }

  onChange = (value: any) => {
    let [provinceCode, cityCode, districtCode] = value
    this.setState({
      provinceCode,
      cityCode,
      districtCode
    })
  }

  // componentDidMount() {
  //   // TODO
  //   let city = '330000'
  //   let list = getCityDistrict('330000')

  //   this.setState({
  //     city,
  //     list
  //   })
  // }

  render() {
    let { provinceCode, cityCode, districtCode } = this.state
    return (
      <PickerView
        onChange={this.onChange}
        data={this.list}
        value={[provinceCode, cityCode, districtCode]}
        cols={3}
      />
    )
  }
}

export default withButton(Area)
