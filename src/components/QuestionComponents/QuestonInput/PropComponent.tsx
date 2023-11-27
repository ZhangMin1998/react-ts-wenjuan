import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './interface'

const PropComponent:FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldValue({ title, placeholder }, { title, placeholder })
  }, [title, placeholder])

  return <Form
    layout='vertical'
    initialValues={{ title, placeholder }}
    form={form}
  >
    <Form.Item label="标题" name='title' rules={[{required: true, message: '请输入标题'}]}>
      <Input />
    </Form.Item>
    <Form.Item label="placeholder" name='placeholder'>
      <Input />
    </Form.Item>
  </Form>
}

export default PropComponent