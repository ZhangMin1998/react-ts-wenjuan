import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography } from 'antd'
import Card from '../../components/Card/Card'
import ListSearch from '../../components/ListSearch/ListSearch'
// import { useSearchParams } from 'react-router-dom'

const { Title } = Typography

const List: FC = () => {
  // const [searchParams] = useSearchParams()
  // console.log('aaa', searchParams.get('aaa'))
  

  const [list, setList] = useState([
    { _id: 'q1', title: '问题1', isPublished: false, isStar: false, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q2', title: '问题2', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q3', title: '问题3', isPublished: false, isStar: false, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q4', title: '问题4', isPublished: true, isStar: false, answerCount: 5, createdAt: '3月10日 13:24' }
  ])
  return (
   <>
    <div className={styles.header}>
      <div className={styles.left}>
        <Title level={3}>我的问卷</Title>
      </div>
      <div className={styles.right}>
        <ListSearch />
      </div>
    </div>

    <div className={styles.content}>
      {/* 问卷列表 */}
      {
        list.length && list.map(item => {
          const { _id } = item
          return <Card key={_id} {...item} />
        })
      }
    </div>

    <div className={styles.footer}>loadMore...</div>
   </>
  )
}

export default List