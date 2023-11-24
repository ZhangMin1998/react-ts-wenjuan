import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch/ListSearch'
import useLoadQuestionDataList from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage/ListPage'
import { updateQuestionListService, deleteQuestionService } from '../../services/request'
import { useRequest } from 'ahooks'

const { Title } = Typography
const { confirm } = Modal

const Trash:FC = () => {
  useTitle('敏敏问卷 - 回收站')

  // const [list, setList] = useState([
  //   { _id: 'q1', title: '问题1', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   { _id: 'q2', title: '问题2', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   { _id: 'q3', title: '问题3', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' },
  //   { _id: 'q4', title: '问题4', isPublished: true, isStar: true, answerCount: 5, createdAt: '3月10日 13:24' }
  // ])

  const { data = {}, loading, refresh } = useLoadQuestionDataList({
    // isStar: false,
    isDeleted: true
  })
  const { list = [], total = 0 } = data

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

  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { loading:recoverLoading, run:recover } = useRequest(async () => {
    for await (const id of selectedIds) {
      await updateQuestionListService(id, {isDeleted: false})
    }
  }, {
    manual: true,
    debounceWait: 700, // 防抖
    onSuccess: () => {
      message.success('恢复成功')
      refresh() // 手动刷新列表
      setSelectedIds([]) // 重置选中
    }
  })

  // 彻底删除
  const deleteAll = () => {
    confirm({
      title: '你确定删除选中的问卷吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: delAll
    })
  }
  const { run:delAll } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    debounceWait: 700, // 防抖
    onSuccess: () => {
      message.success('删除成功')
      refresh() // 手动刷新列表
      setSelectedIds([]) // 重置选中
    }
  })

  // 可以把 JSX 片段定义为一个变量
  const TableElem = <>
    <div style={{marginBottom: '16px'}}>
      <Space>
        <Button type='primary' disabled={!selectedIds.length} onClick={recover}>恢复</Button>
        <Button danger disabled={!selectedIds.length} onClick={deleteAll}>彻底删除</Button>
      </Space>
    </div>
    <Table
      dataSource={list}
      columns={tableColumns}
      pagination={false}
      rowKey={item => item._id}
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys: React.Key[], selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          setSelectedIds(selectedRowKeys as string[])
        }
      }}
    />
  </>

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
          {/* <h4>（搜索）{JSON.stringify(selectedIds)}</h4> */}
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
          (!loading && list.length > 0) && (TableElem)
        }
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash