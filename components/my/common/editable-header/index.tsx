import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '@components/common/header'
import { MY_EDIT_STATUS } from '@constant/my'
import { updateEditStatus } from '@store/actions/my'

import Style from './index.scss'

interface Props {
  title: string
  update: (status: MY_EDIT_STATUS) => void
  editing: boolean
}

class EditableHeader extends Component<Props, any> {
  private get editText(): string {
    let { editing } = this.props
    return editing ? '完成' : '编辑'
  }

  toggleEdit = () => {
    this.props.update(
      this.props.editing ? MY_EDIT_STATUS.NOT_EDIT : MY_EDIT_STATUS.ING_EDIT
    )
  }

  renderRightEdit = () => {
    return (
      <span onClick={this.toggleEdit} className={Style.edit}>
        {this.editText}
      </span>
    )
  }

  componentWillUnmount() {
    this.props.update(MY_EDIT_STATUS.NOT_EDIT)
  }

  render() {
    return (
      <Header
        title={this.props.title}
        bgColor="white"
        // renderHeaderRight={this.renderRightEdit}
      />
    )
  }
}

export default connect(
  (store: any) => {
    let editing = !!(store.my.batch.editable & MY_EDIT_STATUS.ING_EDIT)
    return {
      editing
    }
  },
  dispatch => {
    return {
      update(status: MY_EDIT_STATUS) {
        dispatch(updateEditStatus(status))
      }
    }
  }
)(EditableHeader)
