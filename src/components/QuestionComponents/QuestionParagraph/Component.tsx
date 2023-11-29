import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> =  (props:QuestionParagraphPropsType) => {

  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  const t = text.replaceAll('\n', '<br>')

  function getHtml() {
    return { __html: t}
  }
  
  return (
    <div>
      <Paragraph style={{textAlign: isCenter ? 'center' : 'start', marginBottom: '0'}}>
        <span dangerouslySetInnerHTML={getHtml()}></span>
      </Paragraph>
    </div>
  )
}

export default QuestionParagraph