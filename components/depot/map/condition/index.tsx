import React, { Component } from 'react'

import More from './more'
import Style from './index.scss'

interface State {
  data: any
}

interface Props {
  onChange: (data: any) => void
  onChangeVisible: (visible: boolean) => void
  visible?: boolean
}

class Condition extends Component<Props, State> {
  state = {
    data: {}
  }

  onStore = () => {}

  onConfirm = (curData: {}) => {
    this.setState(
      ({ data: prevData }) => {
        let newData = {
          ...prevData,
          ...curData
        }
        return {
          data: newData
        }
      },
      () => {
        this.props.onChange(this.state.data)
        this.props.onChangeVisible(false)
      }
    )
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let { __prevPropsVisible, visible: prevVisible } = prevState
  //   let { visible: nextVisible } = nextProps
  //   if (nextVisible !== __prevPropsVisible) {
  //     return {
  //       visible: nextVisible,
  //       __prevPropsVisible: nextVisible
  //     }
  //   } else {
  //     if (prevVisible !== __prevPropsVisible) {
  //       return {
  //         visible: prevVisible,
  //         __prevPropsVisible: prevVisible
  //       }
  //     }
  //   }
  //   return null
  // }

  private hide = () => {
    this.props.onChangeVisible(false)
  }

  render() {
    return this.props.visible ? (
      <div className={Style.condition}>
        <div className={Style.mask} onClick={this.hide} />
        <div className={Style.wrap}>
          <More onConfirm={this.onConfirm} initData={this.state.data} />
        </div>
      </div>
    ) : null
  }
}

export default Condition
