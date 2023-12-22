import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionListService } from '../../../services/request'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/modules/pageInfoReducer'
import EditToolBar from './EditToolBar'

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }
  
  if (editState) {
    return (
      <Input 
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button type='text' icon={<EditOutlined/>} onClick={() => setEditState(true)}/>
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionListService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault() // 阻止网页的保存行为
    if (!loading) save()
  })

  // 自动保存 （不是定期保存，不是定时器）
  useDebounceEffect(() => {
    save()
  },[componentList, pageInfo],
  {
    wait: 1000
  })
  
  return (
    <Button
      icon={loading ? <LoadingOutlined /> : null}
      onClick={save}
      disabled={loading}
    >
      保存
    </Button>
  )
}

const EditHeader:FC = () => {
  const navigate = useNavigate()

  return <div className={styles.header_wrapper}>
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type='link' icon={<LeftOutlined/>} onClick={() => navigate(-1)}>返回</Button>
          <TitleElem />
        </Space>
      </div>
      <div className={styles.main}>
        <EditToolBar />
      </div>
      <div className={styles.right}>
        <Space>
          <SaveButton />
          <Button type='primary'>发布</Button>
        </Space>
      </div>
    </div>
  </div>
}

export default EditHeader