import React, { Component } from 'react'

import FilterBar from '@components/common/filter-bar'

import Area from './area'
import More from './more'
import Temp from './temp'
import Volume from './volume'
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
          <FilterBar.Item label="温度" iconable>
            <Temp onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>
          <FilterBar.Item label="库容" iconable>
            <Volume onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>
          <FilterBar.Item label="更多" iconable>
            <More onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>

          <FilterBar.Item label="排序" iconable>
            <Sort onConfirm={this.onConfirm} initData={this.state.data} />
          </FilterBar.Item>

          {/* <FilterBar.Item
            labelRender={() => {
              return (
                <svg
                  onClick={this.onStore}
                  className={Style.icon}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-shangxia" />
                </svg>
              )
            }}
          /> */}
        </FilterBar>
      </>
    )
  }
}

export default Condition
