import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { fetchDetailAction } from '@store/actions/depot'
import { connect } from 'react-redux'

import DepotCard from '@components/common/card/depot'

class DepotContent extends Component<any> {
  componentDidMount() {
    this.props.fetchDetail(this.props.router.query.id)
  }

  render() {
    return this.props.depot ? <DepotCard data={this.props.depot} /> : null
  }
}

export default withRouter(
  connect(
    (state: any, props: any) => {
      let depotId = props.router && props.router.query.id
      if (depotId) {
        return {
          depot: state.depot.detail[depotId]
        }
      }
      return {}
    },
    dispatch => {
      return {
        fetchDetail(id) {
          dispatch(fetchDetailAction(id))
        }
      }
    }
  )(DepotContent)
)
