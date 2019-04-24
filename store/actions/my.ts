import ActionType from './index'
import { MY_EDIT_STATUS, MY_LIST_SELECTALL } from '@constant/my'

export const UPDATE_EDIT_STATUS = 'UPDATE_EDIT_STATUS'
export const UPDATE_SELECT_ALL = 'UPDATE_SELECT_ALL'
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL'

export const ADD_BATCH_ITEM = 'ADD_BATCH_ITEM'
export const REMOVE_BATCH_ITEM = 'REMOVE_BATCH_ITEM'
export const UPDATE_BATCH_ITEM_SELECTED = 'UPDATE_BATCH_ITEM_SELECTED'
export const UPDATE_BATCH_ALL_SELECTED = 'UPDATE_BATCH_ALL_SELECTED'

export function updateEditStatus(payload: MY_EDIT_STATUS): ActionType {
  return {
    type: UPDATE_EDIT_STATUS,
    payload
  }
}

export function updateSelectAll(payload: MY_LIST_SELECTALL): ActionType {
  return {
    type: UPDATE_SELECT_ALL,
    payload
  }
}

export function addBatchListItem(payload): ActionType {
  return {
    type: ADD_BATCH_ITEM,
    payload
  }
}
export function removeBatchListItem(payload): ActionType {
  return {
    type: REMOVE_BATCH_ITEM,
    payload
  }
}

export function updateBatchItemSelected(payload: {
  id: any
  selected: boolean
}): ActionType {
  return {
    type: UPDATE_BATCH_ITEM_SELECTED,
    payload
  }
}

export function updateBatchAllSelected(payload: MY_LIST_SELECTALL): ActionType {
  return {
    type: UPDATE_BATCH_ALL_SELECTED,
    payload
  }
}

export function toggleBatchAll(payload: MY_LIST_SELECTALL): ActionType {
  return {
    type: TOGGLE_SELECT_ALL,
    payload
  }
}
