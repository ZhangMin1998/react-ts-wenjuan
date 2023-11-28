import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents/index'
import { changeComponentProps } from '../../../store/modules/componentsReducer'
import { useDispatch } from 'react-redux'

const NoProp: FC = () => {
  return <div style={{textAlign: 'center'}}>未选中组件</div>
}

const ComponentProp:FC = () => {
  const dispatch = useDispatch()

  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp /> // 如果没有选中

  const { type, props, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  function changeProps(newProps: ComponentPropsType) { // 所有组件的修改 都会到这里
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent

    // console.log(fe_id, newProps)
    dispatch(changeComponentProps({fe_id, newProps}))
  }

  const { PropComponent } = componentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked}/>
}

export default ComponentProp