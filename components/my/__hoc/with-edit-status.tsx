import React from 'react'
import { connect } from 'react-redux'
import { MY_EDIT_STATUS } from '@constant/my'

export default function withEditStatus(Target) {
  function WithEditStatusComponent(props) {
    return <Target {...props} editing={props.editing} />
  }

  return connect((store: any) => {
    let status = store.my.batch.editable
    return {
      editing: status & MY_EDIT_STATUS.ING_EDIT
    }
  })(WithEditStatusComponent)
}
