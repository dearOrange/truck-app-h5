import React, { Component } from 'react'

import FilterBar from '@components/common/filter-bar'

import Area from './area'
import Temp from './temp'
import Time from './time'

import Sort from './sort'

interface State {
  data: any
}

interface Props {
  onChange: (data: any) => void
}

class Condition extends Component<Props, State> {
  private item: any = null
  state = {
    data: {}
  }

  onStore = () => {}

  onConfirm = (curData: {}) => {
    this.setState(({ data: prevData }) => {
      let newData = {
        ...prevData,
        ...curData
      }
      this.props.onChange(newData)
      return {
        data: newData
      }
    })

    this.item && this.item.hide()
  }
  onItemChange = (item: any) => {
    this.item = item
  }

  render() {
    return (
      <>
        <FilterBar onItemChange={this.onItemChange}>
          <FilterBar.Item label="区域" iconable>
            <Area onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>
          <FilterBar.Item label="温层类型" iconable>
            <Temp onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>
          <FilterBar.Item label="入驻时间" iconable>
            <Time onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>
          <FilterBar.Item label="排序" iconable>
            <Sort onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>
        </FilterBar>
      </>
    )
  }
}

export default Condition
