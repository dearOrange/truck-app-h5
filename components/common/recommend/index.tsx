import React, { Component } from 'react'
import { isEmpty } from 'lodash'

import Style from './index.scss'

interface Props {
  dataLoader?: () => Promise<any>
  itemRender?: (data: any) => React.ReactNode
  containerRender?: (children: any) => React.ReactNode
}

interface State {
  list: any[]
}
export default class Recommend extends Component<Props, State> {
  state = {
    list: []
  }

  get isEmpty(): boolean {
    return isEmpty(this.state.list)
  }

  constructor(props: any) {
    super(props)
  }

  loadData = async () => {
    let { dataLoader } = this.props

    if (dataLoader) {
      let { success, data: list } = await dataLoader()
      if (success) {
        this.setState({
          list
        })
      }
    }
  }

  rendList = (list: any[]): React.ReactNode => {
    let { itemRender, containerRender } = this.props

    let items = list.map((itemData: any, index: number) => {
      if (itemRender) {
        return (
          <React.Fragment key={index}>{itemRender(itemData)}</React.Fragment>
        )
      } else {
        return this.props.children
      }
    })

    if (containerRender) {
      return containerRender(items)
    } else {
      return items
    }
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <>
        {this.isEmpty ? null : (
          <div className={Style.recomend}>{this.rendList(this.state.list)}</div>
        )}
      </>
    )
  }
}
