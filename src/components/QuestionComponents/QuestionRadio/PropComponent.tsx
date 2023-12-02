import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
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
    <Form.Item label="选项">
      <Form.List name='options'>
        {(fields, { add, remove }) => (
          <>
            {/* 遍历所有的选项，可删除 */}
            {fields.map(({key, name}, index) => {
              
              return <Space key={key} align='baseline'>
                {/* 输入框 */}
                <Form.Item
                  name={[name, 'text']}
                  rules={[
                    {
                      required: true,
                      // whitespace: true,
                      message: "请输入选项内容",
                    },
                  ]}
                >
                  <Input placeholder='输入选项文字...' />
                </Form.Item>
                {/* 删除按钮 */}
                { index > 1 && <MinusCircleOutlined onClick={() => remove(name)} /> }
              </Space>
            })}
            {/* 添加选项 */}
            <Form.Item>
              <Button type='link' onClick={() => add({text: '', value: ''})} icon={<PlusOutlined/>} block>添加选项</Button>
            </Form.Item>
          </>
        )}
      </Form.List>
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