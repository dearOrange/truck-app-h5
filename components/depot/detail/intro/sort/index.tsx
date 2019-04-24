import React from 'react'
import classnames from 'classnames'
import { Sticky } from 'react-sticky'

import Style from './index.scss'

function Sort(props: { onSelect: (type: string) => void }) {
  function onSelect(type) {
    return function() {
      props.onSelect(type)
    }
  }

  return (
    <Sticky topOffset={0}>
      {props => {
        return (
          <div
            className={classnames(Style.sort, {
              [Style.sticky]: props.isSticky
            })}
          >
            <ul className={classnames(Style.inner)}>
              <li onClick={onSelect('basic')}>
                <a>基本信息</a>
              </li>
              <li onClick={onSelect('device')}>
                <a>配套设施</a>
              </li>
              <li onClick={onSelect('feature')}>
                <a>优势特点</a>
              </li>
              <li onClick={onSelect('case')}>
                <a>合作案例</a>
              </li>
              <li onClick={onSelect('map')}>
                <a>地理位置</a>
              </li>
            </ul>
          </div>
        )
      }}
    </Sticky>
  )
}

export default Sort

// export default withSticky({ top: 200 })(Sort)
