import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentInfoType } from '../../../store/modules/componentsReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'

// 临时展示2个组件
// import QuestionInput from '../../../components/QuestionComponents/QuestonInput/Component'
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo:ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({loading}) => {
  const { componentList } = useGetComponentInfo()
  console.log('componentList', componentList)
  
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  }
  return <div className={styles.canvas}>
    {componentList.map(item => {
      const { fe_id } = item

      return <div className={styles.component_wrapper} key={fe_id}>
        <div className={styles.component}>
          {getComponent(item)}
        </div>
      </div>
    })}
    {/* <div className={styles.component_wrapper}>
      <div className={styles.component}>
        <QuestionTitle />
      </div>
    </div>
    <div className={styles.component_wrapper}>
      <div className={styles.component}>
        <QuestionInput />
      </div>
    </div> */}
  </div>
}

export default EditCanvas