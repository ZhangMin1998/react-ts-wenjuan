import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionRadioPropsType } from './interface'

const PropComponent:FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, disabled, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value, form])

  function handleValueChange () {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return <Form
    layout='vertical'
    initialValues={{ title, isVertical, options, value }}
    form={form}
    onValuesChange={handleValueChange}
    disabled={disabled}
  >
    <Form.Item label="标题" name='title' rules={[{required: true, message: '请输入标题'}]}>
      <Input />
    </Form.Item>
    <Form.Item label="默认选中" name='value'>
      <Select value={value} options={options.map(({text, value}) => ({
        value, 
        label: text || ''
      }))}>

      </Select>
    </Form.Item>
    <Form.Item name='isVertical' valuePropName='checked'>
      <Checkbox>竖向排列</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent