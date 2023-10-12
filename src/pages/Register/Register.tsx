import React, { FC } from 'react'
import styles from './Register.module.scss'
import { Typography, Space, Button, Checkbox, Form, Input, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { registerService } from '../../services/user'
import { useRequest } from 'ahooks'

const { Title } = Typography

const Register:FC = () => {
  const navigate = useNavigate()

  type FieldType = {
    username?: string;
    password?: string;
    confirm?: string;
    remember?: string;
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    run(values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const { run } = useRequest(async values => {
    const { username, password } = values
    await registerService(username, password)
  }, {
    manual: true,
    debounceWait: 700, // 防抖
    onSuccess: () => {
      navigate(`/login`)  
      message.success('注册成功')
    }
  })

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined /> </Title>
          <Title level={2}>注册</Title>
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
          autoComplete="off"
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
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min:4, max: 8,  message: '字符长度在4-8之间' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="确认密码"
            name="confirm"
            dependencies={['password']} // 依赖于password
            rules={[
              { required: true, message: '请确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致!'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to='/login'>已有账号，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register