import React, { FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from '@reduxjs/toolkit'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/modules/componentsReducer'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps} = c

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  function handleClick() {
    dispatch(addComponent({
      fe_id: nanoid(),
      type,
      title,
      props: defaultProps
    }))
  }
  return <div className={styles.wrapper} key={type} onClick={handleClick}>
    <div className={styles.component}>
      <Component />
    </div>
  </div>
}

const ComponentLib:FC = () => {
  return <>
    {componentConfGroup.map((group, index) => {
      const { groupId, groupName, components } = group
      return <div key={groupId}>
        <Title level={3} style={{fontSize: '16px', marginTop: index > 0 ? '20px' : 0}}>
          {groupName}
        </Title>
        <div>
          {components.map(item => getComponent(item))}
        </div>
      </div>
    })}
  </>
}

export default ComponentLib