import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { isEmpty } from 'lodash'

import Header from '@components/common/header'
import Whitespace from '@components/common/whitespace'
import Button from '@components/common/button'
import Input from '@components/common/input'
import { requestAndUpdateAction } from '@store/actions/user'

import Style from './index.scss'

interface Option {
  label: string
  field: string
}

export default function simplteEditorFactory(option: Option) {
  class SimpleEditorComponent extends Component<any> {
    private get _invalid(): boolean {
      let filedValue = this.state[option.field]
      return isEmpty(filedValue)
    }

    state = {
      [option.field]: this.props[option.field]
    }

    submit = () => {
      let { [option.field]: value } = this.state
      this.props.update && this.props.update(value)
    }

    onChangeByKey = (key: any) => {
      return (value: any) => {
        this.setState({ [key]: value })
      }
    }

    render() {
      let { getFieldProps, getFieldError } = this.props.form
      let errors
      return (
        <>
          <div className={Style.editor}>
            <Whitespace size={0.3} />
            <div className={Style.form}>
              <div className={Style.formInput}>
                <Input
                  label={option.label}
                  inline
                  initValue={this.props[option.field]}
                  placeholder={'请输入' + option.label}
                  {...getFieldProps(option.field, {
                    onChange: this.onChangeByKey(option.field),
                    rules: [
                      { required: true, message: option.label + '不能为空' }
                    ]
                  })}
                />
                {(errors = getFieldError(option.field)) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
              </div>
              <Whitespace size={0.4} />
              <div>
                <Button
                  disabled={this._invalid}
                  label="保存"
                  onClick={this.submit}
                />
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  const EditorForm = connect(
    (store: any) => {
      let user = store.user
      let field = option.field
      return {
        [field]: user[field]
      }
    },
    dispatch => {
      return {
        update(value) {
          dispatch(
            requestAndUpdateAction({
              name: value,
              type: option.field
            })
          )
        }
      }
    }
  )(createForm()(SimpleEditorComponent))

  return function() {
    return (
      <>
        <Header title={'修改' + option.label} bgColor="white" />
        <EditorForm />
      </>
    )
  }
}
