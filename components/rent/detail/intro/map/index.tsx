import React, { Component } from 'react'
import { Map, Circle, Label } from 'rc-bmap-for-nextjs'
import Config from '@config'

import Style from './index.scss'

export default class DepotMap extends Component<any> {
  handleMapMounted = () => {}

  render() {
    let { data } = this.props
    let { longitude: lng, latitude: lat } = data
    let centerPoint = { lng, lat }

    return (
      <>
        <div className={Style.map}>
          <Map
            ak={Config.baiduMapAK}
            dragging={false}
            center={centerPoint}
            zoom={20}
            mapMounted={this.handleMapMounted}
          >
            <Circle
              center={centerPoint}
              radius={2}
              strokeColor="rgba(107, 165, 214, 1)"
              fillColor="rgba(107, 165, 214, 1)"
              strokeWeight={2}
              strokeOpacity={0.8}
              fillOpacity={0.6}
              strokeStyle="solid"
              massClear={true}
              editing={false}
              clicking={false}
            />
            <Label
              position={centerPoint}
              offset={{ width: -50, height: -50 }}
              content={data.address}
              closeOnClick={false}
              massClear={true}
              style={{
                borderColor: '#fff',
                padding: '.15rem .3rem',
                background: '#fff',
                color: '#333',
                boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.15)'
              }}
            />
          </Map>
        </div>
      </>
    )
  }
}
