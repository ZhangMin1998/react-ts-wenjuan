// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/request'
import { useRequest } from 'ahooks'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {         // 异步函数无法直接在useEffect使用
  //   async function fn() {
  //     const data = await getQuestionService(id)
  //     console.log('data', data)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fn()
  // }, [id])
  // return { loading, questionData }

  // 代替上面注释的
  async function load() {
    const data = await getQuestionService(id)
    return data
  }
  const { data, error, loading } = useRequest(load) // useRequest 的第一个参数是一个异步函数
  
  return { data, error, loading }
}

export default useLoadQuestionData