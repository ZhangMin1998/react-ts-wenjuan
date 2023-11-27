import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { removeSelectedComponent } from '../../../store/modules/componentsReducer'
import { useDispatch } from 'react-redux'

const EditToolBar:FC = () => {
  const dispatch = useDispatch()
  
  function handleDelete () {
    dispatch(removeSelectedComponent())
  }

  return <Space>
    <Tooltip title='删除'>
      <Button shape='circle' icon={<DeleteOutlined/>} onClick={handleDelete}></Button>
    </Tooltip>
  </Space>
}

export default EditToolBar