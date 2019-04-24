import { POST } from './index'

export function changeTel(params) {
  return POST('user/replaceMobile.do', params)
}

export function checkoutTel(params) {
  return POST('user/validateByMobAndCode.do', params)
}

export function fetchCode(params) {
  return POST('login/getVerificationCode.do', params)
}
