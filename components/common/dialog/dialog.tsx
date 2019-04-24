import React, { Component } from 'react'
import classnames from 'classnames'
import Style from './index.scss'

const Dialog = ({ message, isConfirm, onConfirm, onCancel }) => (
  <div className={Style.dialog}>
    <div className={Style.inner}>
      {isConfirm ? (
        <div className={Style.message}>{message}</div>
      ) : (
        <div className={Style.successed}>
          <svg aria-hidden="true">
            <use xlinkHref="#icon-chenggong1" />
          </svg>
          <p>{message}</p>
        </div>
      )}
      {isConfirm ? (
        <div className={Style.buttons}>
          <button className={Style.button} onClick={onCancel}>
            取消
          </button>
          <div className={Style.lines} />
          <button
            className={classnames(Style.button, Style.active)}
            onClick={onConfirm}
          >
            确定
          </button>
        </div>
      ) : null}
    </div>
  </div>
)

export default Dialog
