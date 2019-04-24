import React from 'react'
import classnames from 'classnames'

import { ConditionComponent } from '../__assist'

import Style from './index.scss'

interface Model {
  accordingSort?: any
}

class Sort extends ConditionComponent<any, Model> {
  state: Model = {
    accordingSort: ''
  }

  onChange = (accordingSort: any) => {
    this.setState({
      accordingSort
    })

    this.props.onConfirm && this.props.onConfirm({ accordingSort })
  }

  render() {
    let { accordingSort } = this.state
    return (
      <ul className={Style.sort}>
        <li
          className={classnames({
            [Style.active]: accordingSort === ''
          })}
          onClick={() => this.onChange('')}
        >
          综合排序
        </li>
        <li
          className={classnames({
            [Style.active]: accordingSort === 'B'
          })}
          onClick={() => this.onChange('B')}
        >
          库容从大到小
        </li>
        <li
          className={classnames({
            [Style.active]: accordingSort === 'C'
          })}
          onClick={() => this.onChange('C')}
        >
          发布时间
        </li>
      </ul>
    )
  }
}

export default Sort
