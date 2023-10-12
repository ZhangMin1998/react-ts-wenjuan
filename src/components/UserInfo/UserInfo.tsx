import React, { FC } from 'react'
import styles from './UserInfo.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom' 
import { Avatar, Button, message } from 'antd'
import { getUserInfoService } from '../../services/user'
import { useRequest } from 'ahooks'
import { removeToken } from '../../utils/user-token'

const url = '	https://lf3-cdn2-tos.bytegoofy.com/ppx/mp/static/media/squared.9ff960bc.svg'

const UserInfo:FC = () => {
  const navigate = useNavigate()

  const { data } = useRequest(getUserInfoService)
  const { username } = data || {}

  const logout = () => {
    removeToken()
    message.success('退出成功')
    navigate(`/login`)
  }

  const UserInfo = (
    <>
      <div className={styles.infoBox}>
        <Avatar src={<img src={url} alt="avatar" />} />
        <div>
          <Button type='link' onClick={logout}>{username}</Button>
        </div>
      </div>
    </>
  )

  const Login = (
    <>
      <div>
        <UserOutlined /> <span style={{color: '#fff'}}>去登录</span>
      </div>
    </>
  )
  
  return (
    <div>
      { username ? UserInfo : Login }
    </div>
    // <Link to='/login'>
    //   <Avatar src={<img src={url} alt="avatar" />} />
    // </Link>
  )
}

export default UserInfo