import React, { Component } from 'react'
import TabBarStyle from './index.scss'
import PropTypes from 'prop-types'
import TabItem from './item'

export interface TabItemType {
  title: string
  link: string
}

interface TabBarProps {
  list: TabItemType[]
}

export default class TabBar<P extends TabBarProps> extends Component<P> {
  constructor(props: P) {
    super(props)
  }

  render() {
    let { children, list } = this.props
    return (
      <div className={TabBarStyle.tab}>
        <div className={TabBarStyle.content}>{children}</div>
        <div className={TabBarStyle.bar}>
          {list.map((item: TabItemType, index: number) => {
            return <TabItem title={item.title} link={item.link} key={index} />
          })}
        </div>
      </div>
    )
  }

  static propTypes = {
    list: PropTypes.array.isRequired
  }
}
