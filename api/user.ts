import { POST, UPLOAD } from './index'

export function changeTel(params) {
  return POST('user/replaceMobile.do', params)
}

export function checkoutTel(mobileNumber, code) {
  return POST('user/validateByMobAndCode.do', { mobileNumber, code })
}

export function fetchCode(mobileNumber, type) {
  return POST('login/getVerificationCode.do', { mobileNumber, type })
}

export function unbindPhone(mobileNumber, code) {
  return POST('user/validateByMobAndCode.do', { mobileNumber, code })
}

export function rebindPhone(mobileNumber, code) {
  return POST('user/replaceMobile.do', { mobileNumber, code })
}

export type UpdateUserDataType = {
  name: string
  type: string
}
export function updateUser(params: UpdateUserDataType) {
  return POST('user/modifyUser.do', params)
}

export function upload(params: any) {
  return UPLOAD('example/upload.do', params)
}
