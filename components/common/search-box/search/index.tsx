import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'
import { isEmpty } from 'lodash'

import TypePicker from './type-picker'

import Style from './index.scss'

interface State {
  value: string
}

interface Props {
  onChange: (value: string) => void
  noButton?: boolean
  noLabel?: boolean
  router?: any
}

class Search extends Component<Props, State> {
  private get needCloseBtn(): boolean {
    return !this.isEmpty
  }
  private get isEmpty(): boolean {
    return isEmpty(this.state.value)
  }
  private get isSearchPage(): boolean {
    let { router } = this.props
    let bool = false
    if (router) {
      let { pathname } = router

      if (pathname === '/search') {
        bool = true
      }
    }
    return bool
  }
  private inputRef: any = React.createRef()

  state = {
    value: ''
  }

  componentDidMount() {
    this.focus()
  }

  private focus = () => {
    if (this.isSearchPage) {
      window.setTimeout(() => {
        this.inputRef.current.focus()
      }, 100)
    }
  }

  onFocus = () => {
    if (!this.isSearchPage) {
      Router.push('/search')
    }
  }

  private onChange = (event: React.ChangeEvent<{ value: string }>) => {
    let inputValue = event.target.value
    this.setState({ value: inputValue }, () => {
      this.props.onChange(inputValue)
    })
  }

  private clear = () => {
    this.setState({ value: '' }, () => {
      this.props.onChange('')
    })
    this.focus()
  }

  private onTypePicker = (type: any) => {
    console.log(type)
  }

  render() {
    return (
      <div className={Style.search}>
        <div className={Style.input}>
          {!this.props.noLabel ? (
            <>
              <TypePicker onPicker={this.onTypePicker} />
              <span className={Style.sep} />
            </>
          ) : null}
          <input
            value={this.state.value}
            placeholder="请输入关键字"
            className={Style.boxInput}
            onChange={this.onChange}
            onFocus={this.onFocus}
            ref={this.inputRef}
            readOnly={!this.isSearchPage}
          />
          {this.needCloseBtn ? (
            <span className={Style.close} onClick={this.clear}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </span>
          ) : null}
        </div>
        {!this.props.noButton && this.isSearchPage ? (
          <span className={Style.button}>搜索</span>
        ) : null}
      </div>
    )
  }
}

export default withRouter(Search)
