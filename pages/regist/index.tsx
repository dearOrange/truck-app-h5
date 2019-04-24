import React from 'react'

import Whitespace from '@components/common/whitespace'
import Header from '@components/regist/right'
import Logo from '@components/auth/logo'
import Form from '@components/regist/form'
import Style from './index.scss'
function Regist() {
  return (
    <>
      <Header title={'注册'} />
      <Logo />
      <Form />
      <Whitespace size={0.5} />
      <div className={Style.remark}>注册即代表同意《1号冷链用户使用协议》</div>
      <Whitespace size={0.5} />
    </>
  )
}

export default Regist
