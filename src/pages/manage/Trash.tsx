import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Empty, Table, Tag } from 'antd'
import { useTitle } from 'ahooks'

const { Title } = Typography

const Trash:FC = () => {
  useTitle('妞妞问卷 - 回收站')

  const [list, setList] = useState([
    { _id: 'q1', title: '问题1', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q2', title: '问题2', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q3', title: '问题3', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
    { _id: 'q4', title: '问题4', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' }
  ])

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ]

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <h4>（搜索）</h4>
        </div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length === 0 && <Empty description='暂无数据' />}
        {
          list.length > 0 && <Table dataSource={list} columns={tableColumns} pagination={false} />
        }
      </div>
    </>
  )
}

export default Trash