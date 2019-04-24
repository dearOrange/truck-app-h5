import React, { Component } from 'react'
import classnames from 'classnames'

import withToggleAll from '@components/my/__hoc/with-toggle-all'
import { connect } from 'react-redux'

import { MY_LIST_SELECTALL, MY_EDIT_STATUS } from '@constant/my'
import { updateEditStatus } from '@store/actions/my'

import Style from './index.scss'

interface Tab {
  label: string
  value: any
}

interface Props {
  list: Tab[]
  onChange: (tab?: Tab) => void
  initValue: any
  initialAll: boolean
  toggleAll: (all: MY_LIST_SELECTALL) => void
  cancelEdit: () => void
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
        if (this.props.initialAll) {
          this.props.toggleAll(MY_LIST_SELECTALL.NONE)
        }
        this.props.cancelEdit()
        this.props.onChange(tab)
      }
    )
  }

  uniqueId = (value: string) => {
    return `__coolink_my_tabs_${value}`
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

export default withToggleAll(
  connect(
    null,
    dispatch => {
      return {
        cancelEdit() {
          dispatch(updateEditStatus(MY_EDIT_STATUS.NOT_EDIT))
        }
      }
    }
  )(Tabs)
)
