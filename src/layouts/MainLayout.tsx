import React, { FC } from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo/Logo'

const { Header, Footer, Content } = Layout

const MainLayout:FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>登录</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        问卷调查
        &copy;
        2023 - present. Created by zhangmin
      </Footer>
    </Layout>
  )
}

export default MainLayout