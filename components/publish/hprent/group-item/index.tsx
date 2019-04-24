import React, { Component } from 'react'
import Checkbox from '@components/publish/hpdepot/checkbox'
import { getDicts } from '@api/common/dictionary'

import { findIndex } from 'lodash'

import Style from './index.scss'

interface Props {
  type: string
  onChange?: (value: any) => void
}
interface State {
  typeVal: any
}

class GroupItem extends Component<Props, State> {
  value: Set<any> = new Set()

  state: State = {
    typeVal: null
  }
  dicts = async type => {
    let { success, data } = await getDicts(type)
    if (success) {
      this.setState({
        typeVal: data
      })
    }
  }
  onChange = (value, checked) => {
    if (checked) {
      this.value.add(value)
    } else {
      this.value.delete(value)
    }
    this.props.onChange && this.props.onChange([...this.value].join(','))
  }
  componentDidMount() {
    this.dicts(this.props.type)
  }
  render() {
    let { typeVal } = this.state
    return (
      <>
        <div className={Style.group}>
          <div className={Style.content}>
            {typeVal
              ? typeVal.map((item, index) => {
                  return (
                    <Checkbox
                      key={index}
                      label={item.definedName}
                      onChange={this.onChange}
                    />
                  )
                })
              : null}
            <Checkbox label={'其他'} onChange={this.onChange} />
          </div>
        </div>
      </>
    )
  }
}

export default GroupItem
