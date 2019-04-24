import { POST } from '../index'

export function fetchProfile(params) {
  return POST('user/modifyUser.do', params)
}
