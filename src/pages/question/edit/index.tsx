import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData' 
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/modules/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit:FC = () => {
  // const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { loading } = useLoadQuestionData()

  // 点击空白区域取消选中
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  
  return (
    <div className={styles.container}>
      {/* <div style={{backgroundColor: '#fff',height: '40px'}}>
        <EditHeader />
      </div> */}
      <EditHeader />
      <div className={styles.container_wrapper}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles.canvas_wrapper}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit