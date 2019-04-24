/**
 * Created by ntt on 18/07/20.
 */

/**
 * 时间戳转日期格式
 * @param time
 * @param cFormat
 * @returns {*}
 */

export function fmtDate(obj: string) {
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  var d = '0' + date.getDate()
  return (
    y +
    '-' +
    m.substring(m.length - 2, m.length) +
    '-' +
    d.substring(d.length - 2, d.length)
  )
}

export function fmtMonth(obj: string) {
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  var d = '0' + date.getDate()
  return (
    y +
    '年' +
    m.substring(m.length - 2, m.length) +
    '月' +
    d.substring(d.length - 2, d.length) +
    '日'
  )
}
