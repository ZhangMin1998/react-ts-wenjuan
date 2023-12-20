import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
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
          <Button icon={<CheckOutlined />}>保存</Button>
          <Button type='primary'>发布</Button>
        </Space>
      </div>
    </div>
  </div>
}

export default EditHeader