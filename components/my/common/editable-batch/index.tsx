import React, { Component } from 'react'

import Checkbox from '@components/common/checkbox'
import { MY_LIST_SELECTALL } from '@constant/my'

import withEditStatus from '@components/my/__hoc/with-edit-status'
import withSelectAll from '@components/my/__hoc/with-toggle-all'

import Style from './index.scss'

interface Props {
  selectAll: boolean
  editing: boolean
  initialAll: boolean
  toggleAll: (all: MY_LIST_SELECTALL) => void
  renderBatchActions: () => React.ReactNode
}

class EditableBatch extends Component<Props, any> {
  onChange = () => {
    this.props.toggleAll(
      this.props.initialAll ? MY_LIST_SELECTALL.NONE : MY_LIST_SELECTALL.ALL
    )
  }

  componentWillUnmount() {
    this.props.toggleAll(MY_LIST_SELECTALL.NONE)
  }

  render() {
    return this.props.editing ? (
      <>
        <div className={Style.batch}>
          <div className={Style.inner}>
            <Checkbox
              iniChecked={this.props.initialAll}
              onChange={() => this.onChange()}
            >
              {this.props.initialAll ? '取消' : '全选'}
            </Checkbox>
            <div className={Style.buttons}>
              {this.props.renderBatchActions()}
            </div>
          </div>
        </div>
      </>
    ) : null
  }
}

export default withSelectAll(withEditStatus(EditableBatch))
