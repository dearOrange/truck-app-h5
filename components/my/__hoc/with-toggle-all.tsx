import React from 'react'
import { connect } from 'react-redux'
import { MY_LIST_SELECTALL } from '@constant/my'
import { toggleBatchAll } from '@store/actions/my'

export default function withSelectAll(Target) {
  function WithSelectAllComponent(props) {
    return <Target {...props} />
  }

  return connect(
    (state: any) => {
      let all = state.my.batch.all
      return {
        initialAll: !!(all & MY_LIST_SELECTALL.ALL)
      }
    },
    dispatch => {
      return {
        toggleAll(all: MY_LIST_SELECTALL) {
          dispatch(toggleBatchAll(all))
        }
      }
    }
  )(WithSelectAllComponent)
}
