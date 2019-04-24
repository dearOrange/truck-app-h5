import { POST } from '../index'

export function fetchFootprintList(params = {}) {
  return POST('ptUserView/getListByUserAndApp.do', params)
}
