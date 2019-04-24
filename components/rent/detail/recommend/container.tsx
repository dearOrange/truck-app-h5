import React from 'react'
import Style from './index.scss'
function RecommendContainer(props) {
  return <div className={Style.container}>{props.children}</div>
}

export default RecommendContainer
