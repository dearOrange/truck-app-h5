export function isPhone(phone: string) {
  let rphone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
  return rphone.test(phone)
}

export function isPassword(password: string) {
  let rPassword = /^(?!\d{8,16}$)[a-zA-z0-9]{8,16}$/
  return rPassword.test(password)
}

export function isTemp(temp: string) {
  let rTemp = /^-?[0-9]\d*$/
  return rTemp.test(temp)
}

export function isNumber(number: string) {
  let rNumber = /^([1-9][\d]{0,8})$/
  return rNumber.test(number)
}

export function isFloat(number: string) {
  let rNumber = /^(([1-9]\d+)|[1-9])(\.\d{1,2})?$/
  return rNumber.test(number)
}

export function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}
