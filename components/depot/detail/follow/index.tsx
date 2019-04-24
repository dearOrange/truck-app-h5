import React, { Component } from 'react'
import classnames from 'classnames'
import { addFollow } from '../../../../api/common/follow'
import Style from './index.scss'

class Follow extends Component<
  {
    id: any
    followed: boolean
  },
  any
> {
  state = {
    isFollow: this.props.followed
  }

  private async follow(id) {
    let data = {
      relatedDataType: 'SL',
      relatedDataUkid: id
    }
    // TODO 是否登录/取关/关注
    this.setState(prevState => {
      return {
        isFollow: !prevState.isFollow
      }
    })
    // let { success } = await addFollow(data)
    // if (success) {
    //   this.setState({
    //     isFollow: true
    //   })
    // }
  }

  render() {
    return (
      <svg
        className={classnames('icon', {
          [Style.followed]: this.state.isFollow
        })}
        aria-hidden="true"
        onClick={this.follow.bind(this, this.props.id)}
      >
        <use xlinkHref={'#icon-shoucang'} />
      </svg>
    )
  }
}

export default Follow
