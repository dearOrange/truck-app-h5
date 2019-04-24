import React, { Component } from 'react'
import { isFunction, cloneDeep } from 'lodash'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import AUTH from '@constant/auth'
import Loading from '@components/common/loading'

import {
  fetchLoginUserAction,
  saveLoginBeforeRouteAction
} from '@store/actions/auth'

export default function withAuth(strict = false) {
  return function(Page) {
    class WithAuthPage extends Component<any, any> {
      static async getInitialProps(appContext) {
        let oPageProps = {}

        if (isFunction(Page.getInitialProps)) {
          oPageProps = Page.getInitialProps(appContext)
        }

        return {
          ...oPageProps
        }
      }

      private get loadingText(): string {
        let { authStatus } = this.props
        let text = ' '
        if (authStatus & AUTH.FETCHING) {
          text = '正在读取用户信息'
        } else if (authStatus & AUTH.LOGINING) {
          text = '正在登陆中'
        } else if (authStatus & AUTH.LOGOUTING) {
          text = '正在注销中'
        }
        return text
      }

      state = {
        fetched: false
      }

      static getDerivedStateFromProps(nextProps, prevState) {
        let { authStatus } = nextProps

        // 认证完成
        if (authStatus & AUTH.FINISH) {
          // AND 认证后 未登录状态
          if (!nextProps.isLogged) {
            let { pathname, route, query, asPath } = nextProps.router

            // AND 强制情况
            if (strict) {
              nextProps.saveBeforeRoute({
                pathname,
                route,
                query: cloneDeep(query),
                asPath
              })
              nextProps.router.replace({
                pathname: '/login'
              })
              return null
            }
            // AND 非强制情况
            else {
              return {
                fetched: true
              }
            }
          }
          // AND 认证后 已登录状态
          else {
            return {
              fetched: true
            }
          }
        }
        // 认证未完成
        else {
          return {
            fetched: false
          }
        }
      }

      componentDidMount() {
        let { authStatus } = this.props
        if (authStatus & AUTH.UNLOGIN) {
          this.props.fetchLoginUser()
        }
      }

      render() {
        return this.state.fetched ? (
          <Page {...this.props} />
        ) : (
          <Loading text={this.loadingText} fullscreen />
        )
      }
    }

    return connect(
      (store: any) => {
        let authStatus = store.auth.status
        let isLogged = !!(store.user && store.user.userId)
        return {
          authStatus,
          isLogged
        }
      },
      dispatch => {
        return {
          fetchLoginUser() {
            dispatch(fetchLoginUserAction())
          },
          saveBeforeRoute(route) {
            dispatch(saveLoginBeforeRouteAction(route))
          }
        }
      }
    )(withRouter(WithAuthPage))
  }
}
