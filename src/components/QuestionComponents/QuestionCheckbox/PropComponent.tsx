import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './interface'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent:FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], disabled, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list, form])

  function handleValueChange () {
    if (onChange) {
      // console.log(form.getFieldsValue())
      // const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
      // if (newValues.options) {
      //   // 需要清除text undefined的选项
      //   newValues.options = newValues.options.filter(opt => !(opt.text == null))
      // }
      // const { options = [] } = newValues
      // options.forEach(opt => {
      //   if (opt.value) return
      //   opt.value = nanoid(5) // 补齐opt value
      // })
      
      // onChange(newValues)
    }
  }

  return <Form
    layout='vertical'
    initialValues={{ title, isVertical, list }}
    form={form}
    onValuesChange={handleValueChange}
    disabled={disabled}
  >
    <Form.Item label="标题" name='title' rules={[{required: true, message: '请输入标题'}]}>
      <Input />
    </Form.Item>
    
    <Form.Item name='isVertical' valuePropName='checked'>
      <Checkbox>竖向排列</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent