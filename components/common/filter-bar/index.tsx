import React, { Component } from 'react'

import Item, { Props as ItemProps } from './item'

import Style from './index.scss'

interface State {}
interface Props {
  children: React.ReactNodeArray
  onItemChange: (item: Item) => void
}

function FilterItem(props: ItemProps) {
  return <></>
}

class FilterBar extends Component<Props, State> {
  static Item = FilterItem

  state = {
    tid: -1
  }

  private item: React.ReactNode = null

  constructor(props: any) {
    super(props)
  }

  onPick = ({ item, id }: any) => {
    this.item = item
    this.setState({
      tid: id
    })
    this.props.onItemChange(item)
  }

  render() {
    return (
      <>
        <div className={Style.filterBar}>
          <div className={Style.inner}>
            <>
              {this.props.children.map((item: any, index) => {
                return (
                  <Item
                    onPick={this.onPick}
                    matchId={this.state.tid}
                    key={index}
                    {...item.props}
                  />
                )
              })}
            </>
          </div>
        </div>
      </>
    )
  }
}

export default FilterBar
