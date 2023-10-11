import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Empty, Spin } from 'antd'
import { useTitle } from 'ahooks'
import Card from '../../components/Card/Card'
import ListSearch from '../../components/ListSearch/ListSearch'
import useLoadQuestionDataList from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage/ListPage'

const { Title } = Typography

const Star:FC = () => {
  useTitle('妞妞问卷 - 星标问卷')

  // const [list, setList] = useState([
  //   { _id: 'q1', title: '问题1', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   { _id: 'q2', title: '问题2', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   { _id: 'q3', title: '问题3', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   { _id: 'q4', title: '问题4', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' }
  // ])

  const { data = {}, loading } = useLoadQuestionDataList({
    isStar: true,
    isDeleted: false
  })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{textAlign: 'center'}}>
            <Spin size="large" />
          </div>
        )}
        {/* 问卷列表 */}
        { (!loading && list.length === 0) && <Empty description='暂无数据' />}
        {
          (!loading && list.length > 0) && list.map((item: any) => {
            const { _id } = item
            return <Card key={_id} {...item} />
          })
        }
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star