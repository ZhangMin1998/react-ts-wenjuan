import React, { FC } from 'react'
import styles from './UserInfo.module.scss'
import { Link } from 'react-router-dom' 
import { Avatar } from 'antd'

const UserInfo:FC = () => {
  const url = 'http://git.suntang.com/uploads/-/system/user/avatar/105/avatar.png?width=400'
  return (
    <Link to='/login'>
      <Avatar src={<img src={url} alt="avatar" />} />
    </Link>
  )
}

export default UserInfo