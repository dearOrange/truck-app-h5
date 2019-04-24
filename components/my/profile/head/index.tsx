import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Link from 'next/link'

import Avatar from '@components/common/avatar'

import Style from './index.scss'

interface State {}

interface Props {
  user: any
}

class Head extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      show: true
    }
  }

  private get isLogged(): boolean {
    return this.props.user && this.props.user.userId
  }

  render() {
    let { user } = this.props

    return (
      <>
        {
          <div
            className={classnames(Style.head, {
              [Style.head__logged]: this.isLogged,
              [Style.head__unlogged]: !this.isLogged
            })}
          >
            {this.isLogged ? (
              <>
                <Avatar url={user.photoUrl} />
                <div className={Style.user}>
                  <div className={Style.name}>{user.userName}</div>
                  <div className={Style.edit}>
                    <span className={Style.text}>查看并编辑个人资料</span>
                    <Link href="/my/person">
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-bianji" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Avatar />
                <Link href="/login" replace>
                  <div className={Style.loginBtn}>点击登录</div>
                </Link>
              </>
            )}
          </div>
        }
      </>
    )
  }
}

export default connect((state: any) => {
  return {
    user: state.user
  }
})(Head)
