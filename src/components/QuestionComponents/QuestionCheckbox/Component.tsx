import React, { FC } from 'react'
import { Typography, Checkbox, Space } from 'antd'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionCheckbox: FC<QuestionCheckboxPropsType> =  (props:QuestionCheckboxPropsType) => {
  const { title = '', isVertical = false, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  return <div>
    <Paragraph strong>{title}</Paragraph>
    <Space direction={isVertical ? 'vertical' : 'horizontal'}>
      {list.map(opt => {
        const { text, value, checked } = opt
        return <Checkbox checked={checked} key={value} value={value}>{text}</Checkbox>
      })}
    </Space>
  </div>
}

export default QuestionCheckbox