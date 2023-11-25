import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'

const { Paragraph  } = Typography
const QuestionInput: FC<QuestionInputPropsType> =  (props:QuestionInputPropsType) => {
  const { title = '', placeholder = '' } = { ...QuestionInputDefaultProps, ...props }
  
  return (
    <div>
      <Paragraph strong>
        {title}
      </Paragraph>
      <Input placeholder={placeholder}></Input>
    </div>
  )
}

export default QuestionInput