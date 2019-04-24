import React from 'react'

export default function WhiteSpace(props: { size: number }) {
  let unit = 'rem'

  return (
    <div
      style={{
        height: `${props.size}${unit}`
      }}
    />
  )
}
