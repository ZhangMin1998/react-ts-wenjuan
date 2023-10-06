import React, { FC } from 'react'
// import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'

const MainLayout:FC = () => {
  return (
    <>
      <div>MainLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>MainLayout footer</div>
    </>
  )
}

export default MainLayout