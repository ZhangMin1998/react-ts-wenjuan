import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> =  (props:QuestionParagraphPropsType) => {

  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  // const t = text.replaceAll('\n', '<br>')
  const textList = text.split('\n')

  
  return (
    <div>
      <Paragraph style={{textAlign: isCenter ? 'center' : 'start', marginBottom: '0'}}>
        {/* <span dangerouslySetInnerHTML={{ __html: t}}></span> 尽量不要使用*/}
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionParagraph