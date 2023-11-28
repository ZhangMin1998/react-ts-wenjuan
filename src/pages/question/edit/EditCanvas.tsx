import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentInfoType, changeSelectedId } from '../../../store/modules/componentsReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import classNames from 'classnames'

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
  const { componentList, selectedId } = useGetComponentInfo()
  // console.log('componentList', componentList)
  const dispatch = useDispatch()

  function handleClick(event:MouseEvent, id: string){
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()
  
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  }
  return <div className={styles.canvas}>
    {componentList.filter(c => !c.isHidden).map(item => {
      const { fe_id, isLocked } = item

      // 拼接className
      const wrapperDefaultClassName = styles.component_wrapper
      const selectedClassName = styles.selected
      const lockedClassName = styles.locked
      const wrapperClassName = classNames({
        [wrapperDefaultClassName]: true,
        [selectedClassName]: fe_id === selectedId,
        [lockedClassName]: isLocked
      })

      return <div className={wrapperClassName} key={fe_id} onClick={(e) => handleClick(e, fe_id)}>
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