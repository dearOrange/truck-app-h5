import React, { Component } from 'react'

import SearchBox from '@components/common/search-box'
import History from '@components/search/history'
import withAuth from '@hoc/with-auth'

class Search extends Component {
  render() {
    return (
      <>
        <SearchBox noButton={false} backable={true} />
        <History />
      </>
    )
  }
}

export default withAuth()(Search)
