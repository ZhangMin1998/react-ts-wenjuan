import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'

// 临时展示2个组件
import QuestionInput from '../../../components/QuestionComponents/QuestonInput/Component'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'

const EditCanvas: FC = () => {
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