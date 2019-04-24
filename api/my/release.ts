import { POST } from '../index'

export function fetchAvailableList(params = {}) {
  return POST('baStock/getListByReleaseAndApp.do', params)
}

export function fetchInvalidList(params = {}) {
  return POST('baStock/getListByInvalidAndApp.do', params)
}

export function fetchNoneList(params = {}) {
  return POST('baStock/getListByNoReleaseAndApp.do', params)
}
