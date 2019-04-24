import React from 'react'

import Style from './index.scss'
import { trim, split, includes } from 'lodash'

interface Props {
  data: any
}
export default function Device(props: Props) {
  function devices() {
    let oStr = props.data.ptStockPublish.supportFacility
    return split(oStr, ',').map(str => {
      return trim(str)
    })
  }
  return (
    <>
      <ul className={Style.device}>
        {includes(devices(), 'F001') ? (
          <li>
            <img className={Style.logo} src="/static/img/tongshui.png" alt="" />
            <span className={Style.name}>通水</span>
          </li>
        ) : null}
        {includes(devices(), 'F002') ? (
          <li>
            <img className={Style.logo} src="/static/img/tongdian.png" alt="" />
            <span className={Style.name}>通电</span>
          </li>
        ) : null}
        {includes(devices(), 'F003') ? (
          <li>
            <img className={Style.logo} src="/static/img/yupeng.png" alt="" />
            <span className={Style.name}>雨棚</span>
          </li>
        ) : null}

        {props.data.ptStockPublish.splitable === 1 ? (
          <li>
            <img className={Style.logo} src="/static/img/kefenge.png" alt="" />
            <span className={Style.name}>可分割</span>
          </li>
        ) : null}
        {includes(devices(), 'F004') ? (
          <li>
            <img className={Style.logo} src="/static/img/dianyuan.png" alt="" />
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
    </>
  )
}
