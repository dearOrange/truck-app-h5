import React from 'react'
import withTabbar from '@hoc/with-tabbar'
import withAuth from '@hoc/with-auth'

import Profile from '@components/my/profile'

function My() {
  return (
    <>
      <Profile />
    </>
  )
}

export default withAuth()(withTabbar(My))
