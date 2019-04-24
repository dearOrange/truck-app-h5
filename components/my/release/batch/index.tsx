import React, { Component } from 'react'
import Button from '@components/common/button'
import EditableBatch from '@components/my/common/editable-batch'
import withEditStatus from '@components/my/__hoc/with-edit-status'
import withBatchList from '@components/my/__hoc/with-batch-list'

class Batch extends Component<any, any> {
  get btnDisabled(): boolean {
    return !this.props.batchList || this.props.batchList.length === 0
  }

  batchDelete = () => {
    console.log('批量删除')
    this.props.onBatchCompleted(true)
  }

  batchRefresh = () => {
    console.log('批量刷新')
    this.props.onBatchCompleted(true)
  }

  renderBatch = () => {
    return (
      <>
        <Button
          theme="primary"
          size="small"
          label="刷新"
          disabled={this.btnDisabled}
          onClick={this.batchRefresh}
        />
        <Button
          theme="primary"
          size="small"
          label="删除"
          disabled={this.btnDisabled}
          onClick={this.batchDelete}
        />
      </>
    )
  }

  render() {
    return this.props.editing ? (
      <>
        <EditableBatch
          renderBatchActions={() => {
            return this.renderBatch()
          }}
        />
      </>
    ) : null
  }
}

export default withBatchList(withEditStatus(Batch))
