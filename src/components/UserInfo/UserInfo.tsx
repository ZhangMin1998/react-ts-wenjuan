import React, { FC } from 'react'
import styles from './UserInfo.module.scss'
import { Link } from 'react-router-dom' 
import { Avatar } from 'antd'

const UserInfo:FC = () => {
  const url = '	https://lf3-cdn2-tos.bytegoofy.com/ppx/mp/static/media/squared.9ff960bc.svg'
  return (
    <Link to='/login'>
      <Avatar src={<img src={url} alt="avatar" />} />
    </Link>
  )
}

export default UserInfo