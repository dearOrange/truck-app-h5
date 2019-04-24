import { POST } from '@api/index'

export function loginByAccount(params = {}) {
  return POST('login/validate.do', params)
}

export function loginByPhone(params = {}) {
  return POST('login/validateByMobile.do', params)
}

export function logout(params = {}) {
  return POST('login/logout.do', params)
}

export function fetchLoginUser(params = {}) {
  return POST('user/getLoginUser.do', params)
}

export type sendCodeType =
  | 'retrievePass'
  | 'registered'
  | 'validateByMobile'
  | 'validateByMobAndCode'
  | 'replaceMobile'
  | 'bindingWechat'

export function sendVCode(mobileNumber: string, type: sendCodeType) {
  return POST('login/getVerificationCode.do', {
    mobileNumber,
    type
  })
}
