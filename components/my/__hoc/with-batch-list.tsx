import React from 'react'
import { connect } from 'react-redux'
import { filter } from 'lodash'

import { MY_EDIT_STATUS } from '@constant/my'
import { updateEditStatus } from '@store/actions/my'

export default function withBatchList(Target) {
  function WithBatchListComponent(props) {
    let orgBatchCompleted = props.onBatchCompleted

    let newBatchCompleted = function() {
      props.cancelEdit()
      orgBatchCompleted()
    }

    return (
      <Target
        {...props}
        batchList={props.batchList}
        onBatchCompleted={newBatchCompleted}
      />
    )
  }

  return connect(
    (store: any) => {
      let list: any[] = store.my.batch.list
      return {
        batchList: filter(list, item => item.selected).map(item => item.id)
      }
    },
    dispatch => {
      return {
        cancelEdit() {
          dispatch(updateEditStatus(MY_EDIT_STATUS.NOT_EDIT))
        }
      }
    }
  )(WithBatchListComponent)
}
