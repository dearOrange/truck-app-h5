import React from 'react'
import Style from './index.scss'
interface Props {
  data: string
}
function Case(props: Props) {
  return <div className={Style.case}>{props.data}</div>
}

export default Case
