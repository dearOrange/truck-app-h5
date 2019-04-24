import ActionType from './index'

export const SAVE_DEPOT_DETAIL = 'SAVE_DEPOT_DETAIL'
export const FETCH_DEPORT_DETAIL = 'FETCH_DEPORT_DETAIL'

export function saveDetailAction(data: any, id: number): ActionType {
  return {
    type: SAVE_DEPOT_DETAIL,
    payload: { data, id }
  }
}

export function fetchDetailAction(id: number): ActionType {
  return {
    type: FETCH_DEPORT_DETAIL,
    payload: { id }
  }
}
