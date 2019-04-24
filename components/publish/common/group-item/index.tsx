import React, { Component } from 'react'
import Selectbox from '@components/publish/common/select-box'
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
  isShowList = () => {
    let oList = this.state.typeVal
    let nList = oList
    let arrList = [...this.value]
    if (arrList.includes('N')) {
      nList = oList.filter(item => item.definedCode === 'N')
    } else if (arrList && arrList.length && !arrList.includes('N')) {
      nList = oList.filter(item => item.definedCode !== 'N')
    }
    return nList
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
    let { type } = this.props
    return (
      <>
        <div className={Style.group}>
          <div className={Style.content}>
            {typeVal
              ? type === 'ExistingSystem'
                ? this.isShowList().map(item => {
                    return (
                      <Selectbox
                        key={item.definedCode}
                        definedName={item.definedName}
                        definedCode={item.definedCode}
                        onChange={this.onChange}
                      />
                    )
                  })
                : typeVal.map(item => {
                    return (
                      <Selectbox
                        key={item.definedCode}
                        definedName={item.definedName}
                        definedCode={item.definedCode}
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
