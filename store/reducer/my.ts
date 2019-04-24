import { combineReducers } from 'redux'

import ActionType, {
  UPDATE_EDIT_STATUS,
  UPDATE_SELECT_ALL,
  ADD_BATCH_ITEM,
  REMOVE_BATCH_ITEM,
  UPDATE_BATCH_ITEM_SELECTED,
  UPDATE_BATCH_ALL_SELECTED
} from '../actions'
import { MY_EDIT_STATUS, MY_LIST_SELECTALL } from '@constant/my'

import { remove, find } from 'lodash'

function editable(editable: any = MY_EDIT_STATUS.NOT_EDIT, action: ActionType) {
  switch (action.type) {
    case UPDATE_EDIT_STATUS:
      return action.payload
    default:
      return editable
  }
}

function all(all: any = MY_LIST_SELECTALL.NONE, action: ActionType) {
  switch (action.type) {
    case UPDATE_SELECT_ALL:
      return action.payload
    default:
      return all
  }
}

function list(list: { id: any; selected: boolean }[] = [], action: ActionType) {
  switch (action.type) {
    case ADD_BATCH_ITEM:
      return [...list, { id: action.payload, selected: false }]
    case REMOVE_BATCH_ITEM:
      remove(list, item => {
        return item.id === action.payload
      })
      return [...list]
    case UPDATE_BATCH_ITEM_SELECTED:
      let { id, selected: itemSelected } = action.payload
      let findItem
      if (
        (findItem = find(list, item => {
          return item.id === id
        }))
      ) {
        findItem.selected = itemSelected
      }
      return [...list]
    case UPDATE_BATCH_ALL_SELECTED:
      if (action.payload & MY_LIST_SELECTALL.ALL) {
        return list.map(item => {
          return {
            id: item.id,
            selected: true
          }
        })
      } else if (action.payload & MY_LIST_SELECTALL.NONE) {
        return list.map(item => {
          return {
            id: item.id,
            selected: false
          }
        })
      }
      return list

    default:
      return list
  }
}

export default combineReducers({
  batch: combineReducers({
    editable,
    all,
    list
  })
})
