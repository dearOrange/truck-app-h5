import React, { Component } from 'react'
import classnames from 'classnames'

import Style from './index.scss'

interface Tab {
  label: string
  value: any
}

interface Props {
  list: Tab[]
  onChange: (tab?: Tab) => void
  initValue: any
}

class Tabs extends Component<Props> {
  state = {
    curValue: this.props.initValue
  }

  onChange = (tab: Tab) => {
    if (tab.value === this.state.curValue) {
      return
    }
    this.setState(
      {
        curValue: tab.value
      },
      () => {
        this.props.onChange(tab)
      }
    )
  }

  uniqueId = (value: string) => {
    return `__coolink_news_tabs_${value}`
  }

  render() {
    return (
      <div className={Style.tabs}>
        <div className={Style.inner}>
          {this.props.list.map(item => {
            return (
              <span
                className={classnames(Style.tabItem, {
                  [Style.active]: item.value === this.state.curValue
                })}
                key={this.uniqueId(item.value)}
                onClick={() => this.onChange(item)}
              >
                {item.label}
              </span>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Tabs
