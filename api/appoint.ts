import { POST } from './index'

export function fetchAppoint(params = {}) {
  return POST('ptIntention/savePtIntention.do', params)
}
