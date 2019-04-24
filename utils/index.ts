import { isPhone } from './is'
import { Modal } from 'antd-mobile'

export function sleep(time = 1000) {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove('醒啦')
    }, time)
  })
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

export function test() {
  return isPhone('123123')
}

export function confirm(
  message: string,
  callback: () => any | Promise<{ ok: boolean; data: any }> = () => {},
  options: { text?: string } = {}
): Promise<any> {
  let confirmBtnText = options.text || '确认'

  return new Promise(reslove => {
    Modal.alert('', message, [
      {
        text: '取消',
        style: {
          color: '#00AE66'
        },
        onPress() {
          reslove({
            ok: false
          })
        }
      },
      {
        text: confirmBtnText,
        onPress() {
          let result = callback()
          if (result && !!result.then) {
            result.then((data: any) => {
              reslove({ ok: true, data })
            })
          } else {
            reslove({
              ok: true,
              data: result
            })
          }
        },
        style: {
          color: '#00AE66'
        }
      }
    ])
  })
}

export function assginIn(target: any, obj2: any) {
  let keys = Object.keys(target)

  return keys.reduce((acc: any, key) => {
    if (obj2.hasOwnProperty(key)) {
      acc[key] = obj2[key]
    } else {
      acc[key] = target[key]
    }
    return acc
  }, {})
}

export function joinPosition(
  { province = '', city = '', district = '' },
  sep = '-'
) {
  return [province, city, district].filter(item => !!item).join(sep)
}
