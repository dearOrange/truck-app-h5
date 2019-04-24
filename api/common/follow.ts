import { POST } from '../index'

export function addFollow(params = {}) {
  return POST('ptUserFollow/savePtUserFollow.do', params)
}
