import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'

// 临时展示2个组件
import QuestionInput from '../../../components/QuestionComponents/QuestonInput/Component'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'

type PropsType = {
  loading: boolean
}

const EditCanvas: FC<PropsType> = ({loading}) => {
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  }
  return <div className={styles.canvas}>
    <div className={styles.component_wrapper}>
      <div className={styles.component}>
        <QuestionTitle />
      </div>
    </div>
    <div className={styles.component_wrapper}>
      <div className={styles.component}>
        <QuestionInput />
      </div>
    </div>
  </div>
}

export default EditCanvas