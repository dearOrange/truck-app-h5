import React, { forwardRef } from 'react'
import { ActionSheet } from 'antd-mobile'
import classnames from 'classnames'

import Avatar from '@components/common/avatar'
import createUserArrowButton from '@components/my/person/__utils/create-user-arrow-button'
import { PLATFORM } from '@constant/global'

import { upload } from '@api/user'

import Style from './index.scss'

let onAvatarChange

const MyPlatform: PLATFORM = PLATFORM.WEB

function WebImageContainer(props) {
  return (
    <div className={classnames(Style.container, Style.web)}>
      <input type="file" name="file" onChange={onWebTapHandle} />
      {props.children}
    </div>
  )
}

async function onWebTapHandle(event) {
  let fd = new FormData()
  fd.append('file', event.target.files[0])
  let { success, data } = await upload(fd)
  if (success) {
    onAvatarChange(null, {
      name: data.ukid,
      type: 'profilePhoto'
    })
  }
}

function NativeImageContainer(props) {
  return (
    <div
      className={classnames(Style.container, Style.native)}
      onClick={onNativeTapHandle}
    >
      {props.children}
    </div>
  )
}

function onNativeTapHandle() {
  ActionSheet.showActionSheetWithOptions(
    {
      options: ['拍照', '从手机相册选择'],
      message: '更换头像',
      maskClosable: true
    },
    (index: number) => {
      if (index !== -1) {
        if (index === 0) {
          // TODO 选择拍照
        } else if (index === 1) {
          // TODO 选择从相册选择
        }
      } else {
        onAvatarChange('未改变头像')
      }
    }
  )
}

let textToAvatar = (data: any, field) => {
  return () => {
    let avatarContent = <Avatar borderless size={0.8} url={data[field[1]]} />
    let ImageContainer =
      PLATFORM.WEB === MyPlatform ? WebImageContainer : NativeImageContainer
    return <ImageContainer>{avatarContent}</ImageContainer>
  }
}

const AvatarArrowButton = createUserArrowButton({
  label: '头像',
  field: ['profilePhoto', 'photoUrl'],
  formatter: textToAvatar,
  onTap() {
    return new Promise((resolve, reject) => {
      onAvatarChange = (err, succ) => {
        if (err) {
          reject(err)
        } else {
          resolve(succ)
        }
      }
    })
  }
})

export default AvatarArrowButton
