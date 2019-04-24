import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classnames from 'classnames'

import TabBarStyle from './index.scss'

const TabItem = withRouter(({ link, title, router }: any) => {
  return (
    <Link prefetch href={link}>
      <a
        className={classnames(TabBarStyle.barItem, {
          [TabBarStyle.barItemActive]: router.pathname === link
        })}
      >
        <i className={TabBarStyle.barItemIcon} />
        <span className={TabBarStyle.barItemTitle}>{title}</span>
      </a>
    </Link>
  )
})

export default TabItem
