import React from 'react'

import { connect } from 'react-redux'

import Router, { UrlLike } from 'next/router'

import ArrowButton from '@components/my/common/arrow-button'
import { AbsPersonArrowButton } from '@components/my/person/__assist'
import { isPromise } from '@utils/is'
import { requestAndUpdateAction } from '@store/actions/user'
import { UpdateUserDataType } from '@api/user'

export interface FormatterType {
  (text: {}): () => React.ReactNode
  (text: {}, a1?: any): any
}

type CreatePromiseFunctionType = (a1: any) => () => Promise<any>
type promiseFunctionType = (a1: any) => Promise<any>

type TapFunctionType = CreatePromiseFunctionType | promiseFunctionType

interface Option {
  label: string
  field: string[]
  formatter?: FormatterType | any
  onTap?: UrlLike | TapFunctionType
}

export default function createUserArrowButton(option: Option) {
  class UserArrowButtonComponent extends AbsPersonArrowButton {
    get userData(): any {
      let field = option.field
      return field.reduce((acc, key) => {
        acc[key] = this.props[key]
        return acc
      }, {})
    }

    formatter = (data: any) => {
      let text = data[option.field[0]]
      if (option.formatter) {
        text = option.formatter(data, option.field)
      }

      return this.textFormatter(text)
    }

    onTap = () => {
      if (option.onTap) {
        if ((option.onTap as UrlLike).pathname) {
          Router.push(option.onTap as UrlLike)
        } else {
          let result
          result = (option.onTap as TapFunctionType)(this.userData)
          if (typeof result === 'function') {
            result()
              .then(text => {
                this.changeUser(text)
              })
              .catch(err => {})
          } else if (isPromise(result)) {
            result
              .then(text => {
                this.changeUser(text)
              })
              .catch(err => {})
          }
        }
      }
    }

    changeUser = (data: UpdateUserDataType) => {
      this.props.updateUser(data)
    }

    render() {
      let userData = this.userData
      let noArrow = option.onTap ? false : true
      return (
        <ArrowButton
          noArrow={noArrow}
          leftLabel={option.label}
          rightLabel={this.formatter(userData)}
          onClick={this.onTap}
        />
      )
    }
  }

  return connect(
    (state: any) => {
      let user = state.user
      let field = option.field

      return field.reduce((acc, key) => {
        acc[key] = user[key]
        return acc
      }, {})
      // return {
      //   [field]: user[field]
      // }
    },
    dispatch => {
      return {
        updateUser(data: UpdateUserDataType) {
          dispatch(requestAndUpdateAction(data))
        }
      }
    }
  )(UserArrowButtonComponent)
}
