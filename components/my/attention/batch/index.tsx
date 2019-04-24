import React, { Component } from 'react'
import Button from '@components/common/button'
import EditableBatch from '@components/my/common/editable-batch'
import withEditStatus from '@components/my/__hoc/with-edit-status'
import withBatchList from '@components/my/__hoc/with-batch-list'

class Batch extends Component<any, any> {
  get btnDisabled(): boolean {
    return !this.props.batchList || this.props.batchList.length === 0
  }

  batchUnfollow = () => {
    // TODO
    console.log('批量取消关注')

    console.log(this.props.batchList)

    this.props.onBatchCompleted(true)
  }

  renderBatch = () => {
    return (
      <Button
        theme="primary"
        size="small"
        label="取消关注"
        disabled={this.btnDisabled}
        onClick={this.batchUnfollow}
      />
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
