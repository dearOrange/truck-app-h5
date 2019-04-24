import React, { Component } from 'react'
import { Map, BMapUtil, Marker } from 'rc-bmap-for-nextjs'
import { connect } from 'react-redux'
import { Modal } from 'antd-mobile'

import Config from '@config'
import { fetchList } from '@api/depot'

import Style from './index.scss'

interface Props {
  city?: any
  center?: any
  data: any[]
}

const IconSize = {
  width: 50,
  height: 60
}

class MapMap extends Component<Props> {
  state = {
    center: { lng: 1, lat: 1 }
  }

  mapInstance: any = null

  onMapMounted = async mapInstance => {
    this.mapInstance = mapInstance
    let myCenter = await BMapUtil.getPoint('杭州市')
    this.setState({
      center: myCenter
    })
  }

  async componentDidMount() {}

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.point && !isEqual(nextProps.point, prevState.center)) {
  //     return { center: { ...nextProps.point } }
  //   }
  //   return null
  // }

  onMarkClick = (event, { data }) => {
    Modal.alert(
      null,
      <div className={Style.modal}>
        <p className={Style.title}>{data.title}</p>
        <p className={Style.price}>
          价格:
          {data.expectedPriceType === 'N'
            ? data.expectedPriceTypeName
            : data.price + data.stockPriceUnitName}
        </p>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className={Style.map}>
          <Map
            ak={Config.baiduMapAK}
            center={this.state.center}
            zoom={10}
            mounted={this.onMapMounted}
          >
            <Marker
              point={this.state.center}
              size={{ width: 39, height: 25 }}
            />
            {this.props.data.map((item: any) => {
              return (
                <Marker
                  key={item.id}
                  point={item.point}
                  offset={{
                    height: -IconSize.height,
                    width: -(IconSize.width / 2)
                  }}
                  clicking={true}
                  events={{
                    click: event => {
                      this.onMarkClick(event, item)
                    }
                  }}
                >
                  <Marker.Icon
                    imageUrl={'/static/img/pos.png'}
                    size={{
                      width: IconSize.width,
                      height: IconSize.height
                    }}
                  />
                </Marker>
              )
            })}
          </Map>
        </div>
      </>
    )
  }
  // componentDidUpdate() {
  //   if (this.props.point) {
  //     this.mapInstance.centerAndZoom(this.props.point, 12)
  //   }
  // }
}

export default connect((store: any) => {
  let { city } = store.user
  return {
    city
  }
})(MapMap)
