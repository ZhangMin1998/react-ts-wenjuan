import React, { FC } from 'react'
// import styles from './QuestionLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout:FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <>
      <div>QuestionLayout header</div>
      <div>
      { waitingUserData ? <div style={{ textAlign: 'center', marginTop:'100px' }}><Spin /></div> : <Outlet /> }
      </div>
      <div>QuestionLayout footer</div>
    </>
  )
}

export default QuestionLayout