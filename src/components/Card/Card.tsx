import React, { FC, useState } from 'react'
import styles from './Card.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { EditOutlined, LineChartOutlined, DeleteOutlined, CopyOutlined, StarOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { updateQuestionListService } from '../../services/request'
import { useRequest } from 'ahooks'

const { confirm } = Modal

type PropsType = {
  _id: string,
  title: string,
  isPublished: boolean,
  isStar: boolean,
  answerCount: number,
  createdAt: string
}

const Card: FC<PropsType> = (props: PropsType) => {
  const navigate = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  // 修改标星
  const [isSatrState, setIsStarState] = useState(isStar)
  const { run: changeStar, loading: changStarLoading } = useRequest(async () => {
    await updateQuestionListService(_id, {isStar: isSatrState})
  },{
    manual: true,
    onSuccess: () => {
      setIsStarState(!isSatrState)
      message.success('已更新')
    }
  })

  const duplicate = () => {
    confirm({
      title: '你确定复制该问卷吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => message.success('复制成功')
    })
  }

  return (
   <div className={styles.container}>
    <div className={styles.title}>
      <div className={styles.left}>
        <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
          <Space>
            {isSatrState && <StarOutlined style={{color: 'red'}} />}
            {title}
          </Space>
        </Link>
      </div>
      <div className={styles.right}>
        <Space>
          {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
          <span>答卷: {answerCount}</span>
          <span>{createdAt}</span>
          {/* <h3>答卷: {answerCount}</h3>
          <h3>{createdAt}</h3> */}
        </Space>
      </div>
    </div>
    <Divider style={{margin: '12px 0'}}/>
    <div className={styles['button-container']}>
      <div className={styles.left}>
        <Space>
          <Button icon={<EditOutlined />} type='text' size='small' onClick={() => navigate(`/question/edit/${_id}`)}>编辑问卷</Button>
          <Button icon={<LineChartOutlined />} type='text' size='small' onClick={() => navigate(`/question/stat/${_id}`)} disabled={!isPublished}>问卷统计</Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Space>
          <Button icon={<StarOutlined />} type='text' size='small' onClick={changeStar} disabled={changStarLoading}>
            {isSatrState ? '取消标星' : '标星'}
          </Button>
          <Button icon={<CopyOutlined />} type='text' size='small' onClick={duplicate}>
            复制
          </Button>
          <Popconfirm
            title="提示"
            description="你确定删除该问卷?"
            okText="确定"
            cancelText="取消"
          >
            <Button icon={<DeleteOutlined />} type='text' size='small'>
              删除
            </Button>
          </Popconfirm>
        </Space>
      </div>
    </div>
   </div>
  )
}

export default Card