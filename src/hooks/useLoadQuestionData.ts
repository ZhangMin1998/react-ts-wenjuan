// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/request'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/modules/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // ajax加载
  const { data, error, loading, run } = useRequest(async (id: string) => { // useRequest 的第一个参数是一个异步函数
    if (!id) throw new Error('没有问卷 id')
    const data = await getQuestionService(id)
    return data
  },{
    manual: true
  })

  // 判断id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  // 根据获取的data 设置redux store
  useEffect(() => {
    if(!data) return
    const { title = '', componentList = [] } = data

    // 把componentList存储到redux
    dispatch(resetComponents({
      componentList
    }))

  }, [data])
  
  return { error, loading }
}

export default useLoadQuestionData