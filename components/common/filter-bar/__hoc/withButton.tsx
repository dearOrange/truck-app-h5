import React, { Component } from 'react'

import Button from '@components/common/button'

import Style from './hoc.scss'

interface Props {
  onConfirm: (data: any) => void
  initData: any
}

export default function withButton(Comp: any) {
  return class WithFilterItemButtons extends Component<Props> {
    curRef = React.createRef()

    doSubmit = (clear = false) => {
      let compInstance: any = this.curRef.current
      let data: object = compInstance && compInstance.getData()

      if (clear) {
        data = Object.keys(data).reduce((acc: any, key: string) => {
          acc[key] = ''
          return acc
        }, {})
      }

      this.props.onConfirm(data)
    }

    onClear = () => {
      this.doSubmit(true)
    }

    onSubmit = () => {
      this.doSubmit()
    }

    render() {
      return (
        <>
          <div className={Style.content}>
            <Comp {...this.props} ref={this.curRef} />
          </div>
          <div className={Style.button}>
            <Button
              theme="info"
              size="middle"
              label="不限条件"
              fullable
              onClick={this.onClear}
            />
            <Button
              size="middle"
              label="确定"
              onClick={this.onSubmit}
              fullable
            />
          </div>
        </>
      )
    }
  }
}
