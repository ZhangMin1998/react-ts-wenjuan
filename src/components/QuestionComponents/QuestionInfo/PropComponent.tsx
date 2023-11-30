import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input

const PropComponent:FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, disabled, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc, form])

  function handleValueChange () {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return <Form
    layout='vertical'
    initialValues={{ title, desc }}
    form={form}
    onValuesChange={handleValueChange}
    disabled={disabled}
  >
    <Form.Item label="问卷标题" name='title' rules={[{required: true, message: '请输入问卷标题'}]}>
      <Input />
    </Form.Item>
    <Form.Item label='描述' name='desc'>
      <TextArea />
    </Form.Item>
  </Form>
}

export default PropComponent