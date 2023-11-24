import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { Button, Typography } from 'antd'

// import '../../_mock/index'
import axios from 'axios'

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 1、mock.js只能劫持XMLHttpRequest， 不能劫持fetch， 局限性
    // fetch('/api/test')
    // .then(res => res.json())
    // .then(data => console.log('fetch data', data))

    // 2、axios内部使用的XMLHttpRequest
    // axios.get('/api/test').then(res => console.log('axios data', res.data))

    // nodejs+mock
    // http://localhost:3002/api/test  跨域 create-react-app 创建的项目 webpack打包 devServer代理 解决跨域
    // fetch('/api/test')
    // .then(res => res.json())
    // .then(data => console.log('fetch data', data)) // ok 可以用
    axios.get('/api/test').then(res => console.log('axios data', res.data))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份， 收到答卷 980 份。
        </Paragraph>
        <div>
          <Button type='primary' onClick={() => navigate('/manage/list')}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home