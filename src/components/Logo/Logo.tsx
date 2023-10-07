import React, { FC } from 'react'
import styles from './Logo.module.scss'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom' 

const { Title } = Typography

const Logo:FC = () => {
  return (
    <div className={styles.container}>
      <Link to='/'>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>
            敏敏问卷
          </Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo