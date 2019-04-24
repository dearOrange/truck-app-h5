import React, { Component } from 'react'

import Style from './index.scss'

interface Props {
  onChange?: (values: any[]) => void
}

export const GroupContext = React.createContext({})

class Group extends Component<Props> {
  values: Set<any> = new Set()

  onChange = (value, checked) => {
    this.values[checked ? 'add' : 'delete'](value)
    this.props.onChange && this.props.onChange([...this.values])
  }

  render() {
    return (
      <GroupContext.Provider
        value={{
          onChange: this.onChange
        }}
      >
        <div className={Style.group}>
          {React.Children.map(this.props.children, child => {
            return <div className={Style['group-item']}>{child}</div>
          })}
        </div>
      </GroupContext.Provider>
    )
  }
}

export default Group
