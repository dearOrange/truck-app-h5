import React, { Component } from 'react'

import { assginIn } from '@utils/index'

export interface ConditionItemProp<T, M> {
  onConfirm?: (data: any) => void
  initData?: M
}

export abstract class ConditionComponent<S, M> extends Component<
  ConditionItemProp<S, M>,
  S
> {
  constructor(props: ConditionItemProp<S, M>) {
    super(props)
  }

  componentDidMount() {
    this.setState({ ...assginIn(this.state, this.props.initData || {}) })
  }

  getData() {
    return { ...this.state }
  }
}
