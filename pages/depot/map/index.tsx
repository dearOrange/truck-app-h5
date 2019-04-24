import React, { Component } from 'react'
import { Toast } from 'antd-mobile'

import Header from '@components/common/header'
import MapMap from '@components/depot/map/map'
import MapTools from '@components/depot/map/tools'
import MapCondition from '@components/depot/map/condition'
import withAuth from '@hoc/with-auth'
import { fetchList } from '@api/depot'

import Style from './index.scss'

interface State {}

class Map extends Component<any, State> {
  state = {
    params: {},
    center: null,
    points: [],
    conditionVisible: false
  }

  onConditionChange = (params: any) => {
    this.setState({ params, conditionVisible: false }, () => {
      this.fetch()
    })
  }
  onChangeVisible = (conditionVisible: boolean) => {
    this.setState({
      conditionVisible
    })
  }

  onPosChange = center => {
    this.setState({
      center
    })
  }

  onOpenFilterPanel = () => {
    this.setState({
      conditionVisible: true
    })
  }

  fetch = async () => {
    let { params } = this.state
    let { success, data: list } = await fetchList({
      ...params,
      pageSize: 50,
      pageNum: 1,
      provinceCode: 330000, // 浙江省
      cityCode: 330100 // 杭州市
      // districtCode: 330104, // 区
    })

    if (success) {
      let points = list
        .filter(item => {
          return item.longitude && item.latitude
        })
        .map(item => {
          let { latitude: lat, longitude: lng, relatedDataUkid: id } = item
          return {
            point: {
              lat,
              lng
            },
            id,
            data: item
          }
        })
      this.setState({
        points
      })

      Toast.info(
        list.length
          ? `共发现${list.length}个仓库信息`
          : '未发现满足条件的仓库信息',
        1.5
      )
    }
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    return (
      <>
        <Header title="地图找库" bgColor="white" />
        <div className={Style.content}>
          <MapCondition
            visible={this.state.conditionVisible}
            onChange={this.onConditionChange}
            onChangeVisible={this.onChangeVisible}
          />
          <MapMap center={this.state.center} data={this.state.points} />
          <MapTools
            onPosChange={this.onPosChange}
            onOpenFilterPanel={this.onOpenFilterPanel}
          />
        </div>
      </>
    )
  }
}

export default withAuth(true)(Map)
