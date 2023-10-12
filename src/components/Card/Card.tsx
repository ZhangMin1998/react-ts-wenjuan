import React, { FC, useState } from 'react'
import styles from './Card.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { EditOutlined, LineChartOutlined, DeleteOutlined, CopyOutlined, StarOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { updateQuestionListService, duplicateQuestionService } from '../../services/request'
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

  // 复制
  const duplicate = () => {
    confirm({
      title: '你确定复制该问卷吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: duplicateRun
    })
  }
  const { loading:duplicateLoading, run:duplicateRun } = useRequest(async () => {
    const data = await duplicateQuestionService(_id)
    return data // 要有返回值，result才有值
  }, {
    manual: true,
    onSuccess: (result) => {
      message.success('复制成功')
      navigate(`/question/edit/${result.id}`) // 复制成功后跳转到编辑页
    }
  })

  // 删除
  const [isDeleteState, setIsDeleteState] = useState(false)
  const { loading:delLoading, run:del } = useRequest(async () => {
    const data = await updateQuestionListService(_id, {isDeleted: true})
    return data // 要有返回值，result才有值
  }, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      setIsDeleteState(true)
    }
  })

  // 如果已经删除的问卷 不显示  !!!!!!还可以这样
  if (isDeleteState) return null

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
          <Button icon={<CopyOutlined />} type='text' size='small' onClick={duplicate} disabled={duplicateLoading}>
            复制
          </Button>
          <Popconfirm
            title="提示"
            description="你确定删除该问卷?"
            okText="确定"
            cancelText="取消"
            onConfirm={del}
          >
            <Button icon={<DeleteOutlined />} type='text' size='small' disabled={delLoading}>
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