import React, { FC, useState } from 'react'
import { Input, message } from 'antd'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import { 
  changeSelectedId
} from '../../../store/modules/componentsReducer'

const Layers: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentInfo()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  const handleTitleClick = (fe_id:string) => {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id))
      return
    }
  }

  return (
    <>
      {componentList.map((c:any) => {
        const { fe_id, title, isHidden, isLocked } = c

        // 拼接 title className
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changingTitleId && (
                <Input />
              )}
              {fe_id !== changingTitleId && title}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers