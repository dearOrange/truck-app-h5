import React from 'react'
import classnames from 'classnames'

import { ConditionComponent } from '../__assist'

import Style from './index.scss'

interface Model {
  accordingSort?: string
}

class Sort extends ConditionComponent<any, Model> {
  state: Model = {
    accordingSort: 'A'
  }

  onChange = (accordingSort: string) => {
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
            [Style.active]: accordingSort === 'A'
          })}
          onClick={() => this.onChange('A')}
        >
          综合排序
        </li>
        <li
          className={classnames({
            [Style.active]: accordingSort === 'B'
          })}
          onClick={() => this.onChange('B')}
        >
          发布时间
        </li>
        <li
          className={classnames({
            [Style.active]: accordingSort === 'D'
          })}
          onClick={() => this.onChange('D')}
        >
          价格从高到低
        </li>
        <li
          className={classnames({
            [Style.active]: accordingSort === 'E'
          })}
          onClick={() => this.onChange('E')}
        >
          价格从低到高
        </li>
        <li
          className={classnames({
            [Style.active]: accordingSort === 'C'
          })}
          onClick={() => this.onChange('C')}
        >
          入驻时间
        </li>
      </ul>
    )
  }
}

export default Sort
