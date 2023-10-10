import React, { FC } from 'react'
import styles from './ManageLayout.module.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/request'
import { useRequest } from 'ahooks'

const ManageLayout:FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // console.log('pathname', pathname)

  // const [loading, setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   console.log('data', data)
  //   const { id } = data || {}
  //   if (id) {
  //     navigate(`/question/edit/${id}`)
  //     message.success('创建成功')
  //     setLoading(false)
  //   }
  // }
  async function load() {
    const data = await createQuestionService()
    return data
  }
  const { loading, run } = useRequest(load, { // 如果设置了 options.manual = true，则 useRequest 不会默认执行，需要通过 run 来触发执行
    manual: true,
    onSuccess: (result, params) => {
      // console.log(result)
      navigate(`/question/edit/${result.id}`)
      message.success('创建成功')
    }
  })
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction='vertical'>
            {/* handleCreateClick =>  */}
            <Button type="primary" size='large' icon={<PlusOutlined />} style={{marginTop: '24px'}} onClick={run} disabled={loading}>创建问卷</Button>
            <Divider style={{borderTop: 'transparent'}} />

            <Button
              type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
              size='large'
              icon={<BarsOutlined />}
              onClick={() => navigate('/manage/list')}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
              size='large'
              icon={<StarOutlined />}
              onClick={() => navigate('/manage/star')}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
              size='large'
              icon={<DeleteOutlined />}
              onClick={() => navigate('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default ManageLayout