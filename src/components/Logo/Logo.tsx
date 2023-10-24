import React, { FC, useEffect, useState } from 'react'
import styles from './Logo.module.scss'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom' 
import useGetUserInfo from '../../hooks/useGetUserInfo'

const { Title } = Typography

const Logo:FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState('/')

  useEffect(() => {
    if (username) {
      setPathname('/manage/list')
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>
            妞妞问卷
          </Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo