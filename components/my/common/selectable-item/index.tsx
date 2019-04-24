import React, { Component } from 'react'
import withEditStatus from '@components/my/__hoc/with-edit-status'

import withSelectAll from '@components/my/__hoc/with-toggle-all'
import withBatchItem from '@components/my/__hoc/with-batch-item'

import Checkbox from '@components/common/checkbox'

import { MY_LIST_SELECTALL } from '@constant/my'

import Style from './index.scss'
interface Props<D> {
  id: any
  data: D
  renderItem: (data: D) => React.ReactNode
  editing: boolean
  toggleAll: (all: MY_LIST_SELECTALL) => void
  initialAll: boolean
  batchItem: { id: any; selected: boolean }
  addBatchItem: (id: any) => void
  removeBatchItem: (id: any) => void
  updateBatchItemSelected: (id: any, selected: boolean) => void
}

class SelectableItem<D> extends Component<Props<D>, any> {
  onChange = (checked: boolean) => {
    if (!checked) {
      this.props.toggleAll(MY_LIST_SELECTALL.SOME)
    }
    this.props.updateBatchItemSelected(this.props.id, checked)
  }

  componentDidMount() {
    // console.log(`添加批次ID:${this.props.id}`)
    this.props.addBatchItem(this.props.id)
    if (this.props.initialAll) {
      this.props.updateBatchItemSelected(this.props.id, true)
    }
  }

  componentWillUnmount() {
    // console.log(`删除批次ID:${this.props.id}`)
    this.props.removeBatchItem(this.props.id)
  }

  render() {
    return (
      <div className={Style.selectableItem}>
        {this.props.editing ? (
          <div className={Style.checkbox}>
            <Checkbox
              iniChecked={this.props.batchItem && this.props.batchItem.selected}
              onChange={this.onChange}
            />
          </div>
        ) : null}

        <div className={Style.content}>
          {this.props.renderItem(this.props.data)}
        </div>
      </div>
    )
  }
}

export default withBatchItem(withSelectAll(withEditStatus(SelectableItem)))
