import React from 'react'
import { trim, split, includes } from 'lodash'

import Whitespace from '@components/common/whitespace'

import Serve from './serve'

import Style from './index.scss'
interface Props {
  data: any
}
export default function Device(props: Props) {
  function devices() {
    let oStr = props.data.supportFacility
    return split(oStr, ',').map(str => {
      return trim(str)
    })
  }
  function server() {
    let pStr = props.data.supportService
    return split(pStr, ',').map(str => {
      return trim(str)
    })
  }
  return (
    <>
      <div>
        <div className={Style.subTitle}>必要设备</div>
        <ul className={Style.device}>
          {includes(devices(), 'F001') ? (
            <li>
              <img
                className={Style.logo}
                src="/static/img/tongshui.png"
                alt=""
              />
              <span className={Style.name}>通水</span>
            </li>
          ) : null}
          {includes(devices(), 'F002') ? (
            <li>
              <img
                className={Style.logo}
                src="/static/img/tongdian.png"
                alt=""
              />
              <span className={Style.name}>通电</span>
            </li>
          ) : null}
          {includes(devices(), 'F003') ? (
            <li>
              <img className={Style.logo} src="/static/img/yupeng.png" alt="" />
              <span className={Style.name}>雨棚</span>
            </li>
          ) : null}

          {props.data.splitable === 1 ? (
            <li>
              <img
                className={Style.logo}
                src="/static/img/kefenge.png"
                alt=""
              />
              <span className={Style.name}>可分割</span>
            </li>
          ) : null}
          {includes(devices(), 'F004') ? (
            <li>
              <img
                className={Style.logo}
                src="/static/img/dianyuan.png"
                alt=""
              />
              <span className={Style.name}>备用电源</span>
            </li>
          ) : null}

          {includes(devices(), 'F005') ? (
            <li>
              <img
                className={Style.logo}
                src="/static/img/bangongshi.png"
                alt=""
              />
              <span className={Style.name}>办公室</span>
            </li>
          ) : null}

          {includes(devices(), 'F006') ? (
            <li>
              <img className={Style.logo} src="/static/img/anbao.png" alt="" />
              <span className={Style.name}>安保人员</span>
            </li>
          ) : null}

          {includes(devices(), 'F007') ? (
            <li>
              <img
                className={Style.logo}
                src="/static/img/fengbiyuanqu.png"
                alt=""
              />
              <span className={Style.name}>封闭园区</span>
            </li>
          ) : null}
        </ul>
        <Whitespace size={0.5} />
        <div className={Style.subTitle}>需求服务</div>
        <div className={Style.service}>
          {includes(server(), 'S001') ? <Serve text="装卸服务" /> : null}
          {includes(server(), 'S002') ? <Serve text="叉车租用" /> : null}
          {includes(server(), 'S003') ? <Serve text="高位货架" /> : null}
        </div>
      </div>
    </>
  )
}
