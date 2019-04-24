import React, { Component } from 'react'
import Option from './option'
import { getDicts } from '@api/common/dictionary'
import Style from './index.scss'
import { async } from 'q'

interface Props {
  type: string
  checked: string
  onChange?: (value: any) => void
}
interface State {
  typeVal: any
}

class GroupItem extends Component<Props, State> {
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
  onChange = value => {
    this.props.onChange && this.props.onChange(value)
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
                    <Option
                      key={index}
                      value={item.definedCode}
                      label={item.definedName}
                      checked={this.props.checked === item.definedCode}
                      onChange={this.onChange}
                    />
                  )
                })
              : null}
          </div>
        </div>
      </>
    )
  }
}

export default GroupItem
