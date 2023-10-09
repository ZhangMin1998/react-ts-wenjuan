import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../services/request'

const Edit:FC = () => {
  const { id = '' } = useParams()
  const [loading, setLoading] = useState(true)
  const [questionData, setQuestionData] = useState({})

  useEffect(() => {         // 异步函数无法直接在useEffect使用
    async function fn() {
      const data = await getQuestionService(id)
      console.log('data', data)
      setQuestionData(data)
      setLoading(false)
    }
    fn()
  }, [id])

  return <div>
    <p>编辑页</p>
    { loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p> }
  </div>
}

export default Edit