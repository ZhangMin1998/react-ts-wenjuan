import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionTitle: FC<QuestionRadioPropsType> =  (props:QuestionRadioPropsType) => {
  const { title = '', isVertical = false, options = [], value = '' } = { ...QuestionRadioDefaultProps, ...props }

  return <div>
    <Paragraph strong>{title}</Paragraph>
    <Radio.Group value={value}>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {options.map(opt => {
          const { text, value } = opt
          return <Radio value={value}>{text}</Radio>
        })}
      </Space>
    </Radio.Group>
  </div>
}

export default QuestionTitle