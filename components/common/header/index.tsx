import React, { Component } from 'react'

import Router from 'next/router'
import classnames from 'classnames'
import Color from 'color'

import Back from '@components/common/back'

import Style from './index.scss'

interface Props {
  title?: string
  bgColor?: string
  textColor?: string
  noSpace?: boolean
  // noRightActions?: boolean
  // noRightChinese?: boolean
  // noChinese?: boolean
  // onEditContent: (value) => void

  renderHeaderRight?: () => React.ReactNode
}

export default class Header extends Component<Props, any> {
  static defaultProps = {
    bgColor: '#00ae66'
    // textColor: '#fff'
  }

  constructor(props: any) {
    super(props)
  }
  goBack = () => {
    Router.back()
  }
  // collectStore = () => {
  //   this.setState({
  //     isFollow: !this.state.isFollow
  //   })
  // }
  // onEdit = () => {
  //   this.setState({
  //     isEdit: !this.state.isEdit
  //   })
  //   this.props.onEditContent(this.state.isEdit)
  // }
  render() {
    let textColor
    let backgroundColor = Color(this.props.bgColor)

    if (
      backgroundColor &&
      backgroundColor.valpha !== 0 &&
      !this.props.textColor
    ) {
      textColor = Color(this.props.bgColor).negate()
    }

    return (
      <div
        className={Style.header}
        style={{
          height: this.props.noSpace ? 0 : undefined
        }}
      >
        <div
          className={Style.inner}
          style={{
            backgroundColor: backgroundColor.toString(),
            color: textColor && textColor.toString()
          }}
        >
          <div className={Style.headerLt}>
            <div className={Style.icon}>
              <Back />
            </div>
          </div>
          <div className={Style.headerMd}>
            <span>{this.props.title}</span>
          </div>
          <div className={Style.headerRt}>
            {this.props.renderHeaderRight
              ? this.props.renderHeaderRight()
              : null}

            {/* {this.props.noRightActions ? null : this.props.noChinese ? (
              <>
                <svg
                  className={classnames('icon', Style.icon)}
                  aria-hidden="true"
                  onClick={this.collectStore}
                >
                  <use
                    xlinkHref={
                      this.state.isFollow ? '#icon-shoucang' : '#icon-shoucang1'
                    }
                  />
                </svg>
                <svg
                  className={classnames('icon', Style.icon)}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-iconzhuanfa" />
                </svg>
              </>
            ) : (
              <p onClick={this.onEdit}>{this.state.isEdit ? '编辑' : '完成'}</p>
            )} */}
          </div>
        </div>
      </div>
    )
  }
}
