import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData' 
import styles from './index.module.scss'

const Edit:FC = () => {
  // const { id = '' } = useParams()

  const { data, loading } = useLoadQuestionData()
  
  return (
    <div className={styles.container}>
      <div style={{backgroundColor: '#fff',height: '40px'}}>Header</div>
      <div className={styles.container_wrapper}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles.canvas_wrapper}>
              <div style={{height: '900px'}}>画布</div>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit