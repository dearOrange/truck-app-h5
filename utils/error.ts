import { Toast } from 'antd-mobile'
import { isFunction } from 'lodash'

interface ErrorMessage {
  message: string
  duration: number
  onClose: () => void
}

const Message = {
  error(err: ErrorMessage) {
    Toast.fail(err.message, err.duration, err.onClose)
  }
}
let errorIsShown = false

let ERROR_CODE: any = {
  '1001': {
    message: function(data: any) {
      popError(data.message)
    }
  },
  '1002': {
    message: function(data: any) {
      popError(data.message)
    }
  },
  '400': { message: '[400]错误' },
  '404': { message: '[404]错误' },
  '500': { message: '[500]错误' }
}

function popError(msg: string) {
  if (errorIsShown) {
    return
  }
  errorIsShown = true
  return Message.error({
    message: `${msg}`,
    duration: 2,
    onClose() {
      errorIsShown = false
    }
  })
}

export default function error(code: any, data = {}) {
  let { message } = ERROR_CODE[code] || { message: '出错了' }

  if (message) {
    if (isFunction(message)) {
      return message(data)
    } else {
      return popError(message)
    }
  }
}
