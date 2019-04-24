import React from 'react'

import * as fetchApi from '@api/index'

import Loading from '@components/common/loading'
import Error from '@components/common/error'

interface Config {
  url: string
  method?: 'POST' | 'GET'
}

interface FetchApi {
  (params: any, options?: any): Promise<any>
}

interface State {
  status: number
  data?: any
}

const FETCH_STATUS = {
  UNSTART: 1 << 1,
  LOADING: 1 << 2,
  SUCCESS: 1 << 3,
  ERROR: 1 << 4
}

function isConfig(prefetch: Config | FetchApi): prefetch is Config {
  return (prefetch as Config).url !== undefined
}

function isFetchApi(prefetch: Config | FetchApi): prefetch is FetchApi {
  return typeof (prefetch as FetchApi) === 'function'
}

export default function withPrefetch(
  prefetch: Config | FetchApi,
  params: any = {},
  options?: any
) {
  return function __inner(Component: React.ComponentClass<{ data: any }>) {
    return class WithPrefetchComponent extends React.Component<any, State> {
      state = {
        status: FETCH_STATUS.UNSTART
      }

      private get isUnStart(): boolean {
        return !!(this.state.status & FETCH_STATUS.UNSTART)
      }

      private get isLoading(): boolean {
        return !!(this.state.status & FETCH_STATUS.LOADING)
      }

      private get isFail(): boolean {
        return !!(this.state.status & FETCH_STATUS.ERROR)
      }

      async componentDidMount() {
        this.setState({ status: FETCH_STATUS.LOADING })

        // await sleep(300) // 测试

        let success
        let data

        if (isConfig(prefetch)) {
          let responseData = await fetchApi[prefetch.method || 'GET'](
            prefetch.url,
            params
          )

          success = responseData.success
          data = responseData.data
        } else if (isFetchApi(prefetch)) {
          let responseData = await prefetch(params, options)

          success = responseData.success
          data = responseData.data
        }

        if (success) {
          this.setState({ status: FETCH_STATUS.SUCCESS, data })
        } else {
          this.setState({ status: FETCH_STATUS.ERROR })
        }
      }

      render() {
        let { data }: State = this.state

        return this.isUnStart ? null : this.isLoading ? (
          <Loading fullscreen text="玩命的读取数据..." />
        ) : this.isFail ? (
          <Error text="请求失败!" />
        ) : (
          <Component data={data} {...this.props} />
        )
      }
    }
  }
}
