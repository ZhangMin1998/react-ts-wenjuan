import React, { FC } from 'react'
import styles from './UserInfo.module.scss'
import { Link } from 'react-router-dom' 

const UserInfo:FC = () => {
  return (
    <Link to='/login'>登录</Link>
  )
}

export default UserInfo