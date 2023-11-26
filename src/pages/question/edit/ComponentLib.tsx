import React, { FC } from 'react'
import { Typography } from 'antd'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const { title, type, Component} = c
  return <div className={styles.wrapper}>
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