import React, { FC, useState } from 'react'
import styles from './List.module.scss'
import Card from '../../components/Card/Card'

const List: FC = () => {
  const [list, setList] = useState([
    { _id: 'q1', title: '问题1', isPublished: false, isStar: false, answerCount: 5, cteateAt: '3月10日 13:24' },
    { _id: 'q2', title: '问题2', isPublished: true, isStar: false, answerCount: 5, cteateAt: '3月10日 13:24' },
    { _id: 'q3', title: '问题3', isPublished: false, isStar: false, answerCount: 5, cteateAt: '3月10日 13:24' },
    { _id: 'q4', title: '问题4', isPublished: true, isStar: false, answerCount: 5, cteateAt: '3月10日 13:24' }
  ])
  return (
   <>
    <div className={styles.header}>
      <div className={styles.left}>
        <h3>我的问卷</h3>
      </div>
      <div className={styles.right}>
        搜索
      </div>
    </div>

    <div className={styles.content}>
      {
        list.map(item => {
          const { _id } = item
          return <Card key={_id} {...item} />
        })
      }
    </div>

    <div className={styles.footer}>footer</div>
   </>
  )
}

export default List