import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import { Typography, Space, Button, Checkbox, Form, Input, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { loginService } from '../../services/user'
import { useRequest } from 'ahooks'

const { Title } = Typography

const rememberUser = (username: string, password: string) => {
  localStorage.setItem('USERNAME', username)
  localStorage.setItem('PASSWORD', password)
}
const deleteUseStorage = () => {
  localStorage.removeItem('USERNAME')
  localStorage.removeItem('PASSWORD')
}
const getUseStorage = () => {
  return {
    username: localStorage.getItem('USERNAME'),
    password: localStorage.getItem('PASSWORD')
  }
}

const Login: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const { username, password } = getUseStorage()
    form.setFieldsValue({ username, password })  // setFieldsValue  !!!!!
  }, [])

  const { run } = useRequest(async (username:string, password:string) => {
    await loginService(username, password)
  }, {
    manual: true,
    debounceWait: 700, // 防抖
    onSuccess: () => {
      navigate(`/manage/list`)  
      message.success('登录成功')
    }
  })

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  }
  const onFinish = (values: any) => {
    // console.log('Success:', values)
    const { username, password, remember } = values || {}

    run(username, password) // 调登录接口
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUseStorage()
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const [form] = Form.useForm() // 第三方hook

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserOutlined /> </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          form={form}
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { type: 'string', min:4, max: 8,  message: '字符长度在4-8之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' }
            ]}
          >
            <Input autoComplete="on" allowClear/>
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min:4, max: 8,  message: '字符长度在4-8之间' }
            ]}
          >
            <Input.Password autoComplete="on" allowClear/>
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to='/register'>注册新账号</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login