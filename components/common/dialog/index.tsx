import React from 'react'
import ReactDOM from 'react-dom'
import DialogIndex from './dialog'
import { sleep } from '@utils/index'

const staticize = props =>
  new Promise(fulfill => {
    const holder = document.createElement('div')
    document.body.appendChild(holder)

    const close = () => {
      document.body.removeChild(holder)
    }
    sleep(3000).then(() => {
      close()
    })
    ReactDOM.render(
      <DialogIndex
        {...props}
        onCancel={close}
        onConfirm={() => {
          close()
          fulfill()
        }}
      />,
      holder
    )
  })

export default staticize
