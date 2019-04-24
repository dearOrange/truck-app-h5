import React, { Component } from 'react'
import classnames from 'classnames'

import Header from '@components/common/header'
import Whitespace from '@components/common/whitespace'
import ArrowButton from '@components/my/common/arrow-button'

import Style from './index.scss'

enum CertType {
  NONE = '去看看',
  NOT = '未认证',
  ING = '审核中',
  DONE = '已认证'
}

class Identify extends Component<any> {
  constructor(props: any) {
    super(props)
  }

  renderCertLabel = (label: CertType) => {
    return () => {
      return (
        <span
          className={classnames(Style.label, {
            [Style.ing]: label === CertType.ING,
            [Style.none]: label === CertType.NONE,
            [Style.not]: label === CertType.NOT,
            [Style.done]: label === CertType.DONE
          })}
        >
          {label}
        </span>
      )
    }
  }

  render() {
    return (
      <>
        <Header title="我的认证" bgColor="white" />
        <div className={Style.certificate}>
          <Whitespace size={0.3} />
          <ArrowButton
            noArrow
            leftLabel="个人认证"
            rightLabel={this.renderCertLabel(CertType.NOT)}
            renderHeader={() => {
              return (
                <svg
                  className={classnames('icon', Style.certIcon)}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-renzhengchenggong1" />
                </svg>
              )
            }}
          />
          <ArrowButton
            noArrow
            leftLabel="车辆认证"
            rightLabel={this.renderCertLabel(CertType.DONE)}
            renderHeader={() => {
              return (
                <svg
                  className={classnames('icon', Style.certIcon)}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-cheliangrenzheng" />
                </svg>
              )
            }}
          />
          <ArrowButton
            noArrow
            leftLabel="实地认证"
            rightLabel={this.renderCertLabel(CertType.NOT)}
            renderHeader={() => {
              return (
                <svg
                  className={classnames('icon', Style.certIcon)}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-shidirenzheng" />
                </svg>
              )
            }}
          />
          <ArrowButton
            noArrow
            leftLabel="货源认证"
            rightLabel={this.renderCertLabel(CertType.NONE)}
            renderHeader={() => {
              return (
                <svg
                  className={classnames('icon', Style.certIcon)}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-huoyuan1" />
                </svg>
              )
            }}
          />
        </div>
      </>
    )
  }
}
export default Identify
