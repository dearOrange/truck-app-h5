import { POST } from '../index'

export function helpDepot(params = {}) {
  return POST('ptIntention/savePtIntention.do', params)
}
