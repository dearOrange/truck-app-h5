import axios from 'axios'
import qs from 'qs'
import config from '@config'
import error from '@utils/error'

// 创建axios实例，可以自定义配置
const instance = axios.create({
  baseURL: config.server,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

function cancelableConfig() {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  return {
    cancelToken: source.token,
    source
  }
}

// 响应拦截器
instance.interceptors.response.use(
  (response: any): any => {
    let { status, data } = response
    if (status === 200) {
      // let code = data.code
      let { code, message } = data
      let success = code === '0'

      if (!success) {
        error(code, data)
      }
      return Promise.resolve({
        success,
        msg: message,
        data: data.data,
        page: {
          total: data.total
        }
      })
    }
  },
  ({ message, response }) => {
    // 无返回信息 - 可能是被取消了
    if (!response) {
      return Promise.resolve({
        success: false,
        msg: message,
        data: null
      })
    } else {
      let { status, data } = response
      error(status)
      return Promise.resolve({
        success: false,
        msg: message,
        data
      })
    }
  }
)

function get(url: string, params = {}, options: any = {}) {
  let config = cancelableConfig()
  let { source } = config
  delete config.source
  let request: any = instance.get(url, {
    params,
    ...config,
    ...options
  })
  request.cancel = source.cancel
  return request

  // return instance.get(url, {
  //   params,
  //   ...options
  // })
}

function post(url: string, params = {}, options: any = {}) {
  let config = cancelableConfig()
  let isJson = options.json
  delete options.json
  let { source } = config

  if (isJson) {
    options.headers = { 'content-type': 'application/json;charset=UTF-8' }
  }

  delete config.source
  let request: any = instance.post(
    url,
    isJson ? JSON.stringify(params) : qs.stringify(params),
    {
      ...config,
      ...options
    }
  )
  request.cancel = source.cancel
  return request
}

function upload(url, params) {
  let config = cancelableConfig()
  let { source } = config

  let headers = {
    'Content-Type': 'multipart/form-data'
  }

  delete config.source
  let request: any = instance.post(url, params, {
    ...config,
    headers
  })
  request.cancel = source.cancel
  return request
}

export let GET: any = get
export let POST: any = post
export let UPLOAD: any = upload

// export default instance
