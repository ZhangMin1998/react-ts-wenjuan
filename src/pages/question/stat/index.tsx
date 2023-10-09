import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat:FC = () => {
  const { loading, questionData } = useLoadQuestionData()
  
  return <div>
    <p>统计页</p>
    { loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p> }
  </div>
}

export default Stat