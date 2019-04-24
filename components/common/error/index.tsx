import React from 'react'
import Status from '@components/common/status'

interface Props {
  text: string
}

export default function Error(props: Props) {
  return <Status sub={props.text} />
}
