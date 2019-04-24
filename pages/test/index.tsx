import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import { addCount } from '@store/actions'

function Test(props: any) {
  return (
    <>
      <div className="name">测试页面{props.count}</div>
      <Button onClick={props.add}>按钮</Button>
    </>
  )
}

export default connect(
  (state: any) => {
    return {
      count: state.count
    }
  },
  dispatch => {
    return {
      add() {
        dispatch(addCount())
      }
    }
  }
)(Test)
