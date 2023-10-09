import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../services/request'

const Edit:FC = () => {
  const { id = '' } = useParams()

  useEffect(() => {         // 异步函数无法直接在useEffect使用
    async function fn() {
      const data = await getQuestionService(id)
      console.log('data', data)
    }
    fn()
  }, [id])

  return (
    <p>Edit {id}</p>
  )
}

export default Edit