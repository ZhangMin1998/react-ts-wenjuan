import React, { FC } from 'react'
import styles from './Card.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { EditOutlined, LineChartOutlined, DeleteOutlined, CopyOutlined, StarOutlined } from '@ant-design/icons'

type PropsType = {
  _id: string,
  title: string,
  isPublished: boolean,
  isStar: boolean,
  answerCount: number,
  createdAt: string
}

const Card: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  const navigate = useNavigate()
  return (
   <div className={styles.container}>
    <div className={styles.title}>
      <div className={styles.left}>
        <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
          <Space>
            {isStar && <StarOutlined style={{color: 'red'}} />}
            {title}
          </Space>
        </Link>
      </div>
      <div className={styles.right}>
        {isPublished ? <span style={{color: 'green'}}>已发布</span> : <span>未发布</span>}
        &nbsp;
        <span>答卷: {answerCount}</span>
        &nbsp;
        <span>{createdAt}</span>
      </div>
    </div>
    <Divider />
    <div className={styles['button-container']}>
      <div className={styles.left}>
        <Space>
          <Button icon={<EditOutlined />} type='text' size='small' onClick={() => navigate(`/question/edit/${_id}`)}>编辑问卷</Button>
          <Button icon={<LineChartOutlined />} type='text' size='small' onClick={() => navigate(`/question/stat/${_id}`)} disabled={!isPublished}>问卷统计</Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Space>
          <Button icon={<StarOutlined />} type='text' size='small'>
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Button icon={<CopyOutlined />} type='text' size='small'>
            复制
          </Button>
          <Button icon={<DeleteOutlined />} type='text' size='small'>
            删除
          </Button>
        </Space>
      </div>
    </div>
   </div>
  )
}

export default Card