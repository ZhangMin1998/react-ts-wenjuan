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
      const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
      if (newValues.list) {
        // 需要清除text undefined的选项
        newValues.list = newValues.list.filter(opt => !(opt.text == null))
      }
      const { list = [] } = newValues
      list.forEach(opt => {
        if (opt.value) return
        opt.value = nanoid(5) // 补齐opt value
      })
      
      onChange(newValues)
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
    <Form.Item label="选项">
      <Form.List name='list'>
        {(fields, { add, remove }) => (
          <>
            {/* 遍历所有的选项，可删除 */}
            {fields.map(({key, name}, index) => {
              
              return <Space key={key} align='baseline'>
                <Form.Item name={[name, 'checked']} valuePropName='checked'>
                  <Checkbox />
                </Form.Item>
                {/* 输入框 */}
                <Form.Item
                  name={[name, 'text']}
                  rules={[
                    {
                      required: true,
                      message: "请输入选项文字",
                    },
                    {
                      validator: (_, text) => {
                        const { list = [] } = form.getFieldsValue()
                        let num = 0
                        list.forEach((opt:OptionType) => {
                          if (opt.text === text) num++ // 记录text相同个数，预期只有一个
                        })
                        if (num === 1) return Promise.resolve()
                        return Promise.reject(new Error('和其他选项重复啦'))
                      }
                    }
                  ]}
                >
                  <Input placeholder='输入选项文字...' />
                </Form.Item>
                {/* 删除按钮 */}
                { index > 0 && <MinusCircleOutlined onClick={() => remove(name)} /> }
              </Space>
            })}
            {/* 添加选项 */}
            <Form.Item>
              <Button type='link' onClick={() => add({text: '', value: '', checked: false})} icon={<PlusOutlined/>} block>添加选项</Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
    <Form.Item name='isVertical' valuePropName='checked'>
      <Checkbox>竖向排列</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent