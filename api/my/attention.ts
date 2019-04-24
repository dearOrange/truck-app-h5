import { POST } from '../index'

export function fetchAvailableList(params = {}) {
  return POST('ptUserFollow/getListByReleaseAndApp.do', params)
}

export function fetchInvalidList(params = {}) {
  return POST('ptUserFollow/getListByInvalidAndApp.do', params)
}
