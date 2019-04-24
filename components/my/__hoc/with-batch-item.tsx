import React from 'react'
import { connect } from 'react-redux'
import {
  addBatchListItem,
  removeBatchListItem,
  updateBatchItemSelected
} from '@store/actions/my'

export default function withBatchList(Target) {
  function WithBatchItemComponent(props) {
    return <Target {...props} />
  }

  return connect(
    (store: any, props: any) => {
      let list: any[] = store.my.batch.list
      return {
        batchItem: list.find(item => {
          return item.id === props.id
        })
      }
    },
    dispatch => {
      return {
        addBatchItem(id) {
          dispatch(addBatchListItem(id))
        },
        removeBatchItem(id) {
          dispatch(removeBatchListItem(id))
        },
        updateBatchItemSelected(id: any, selected: boolean) {
          dispatch(updateBatchItemSelected({ id, selected }))
        }
      }
    }
  )(WithBatchItemComponent)
}
