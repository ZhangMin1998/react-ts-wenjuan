import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import Card from '../../components/Card/Card'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'

const { Title } = Typography

const Star:FC = () => {
  useTitle('妞妞问卷 - 星标问卷')

  const [list, setList] = useState([
    { _id: 'q1', title: '问题1', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q2', title: '问题2', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q3', title: '问题3', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q4', title: '问题4', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' }
  ])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <h4>（搜索）</h4>
        </div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {/* {list.length === 0 && <Empty description='暂无数据' />} */}
        {
          list.length && list.map(item => {
            const { _id } = item
            return <Card key={_id} {...item} />
          })
        }
      </div>

      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star