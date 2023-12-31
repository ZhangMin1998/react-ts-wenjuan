// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/request'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/modules/componentsReducer'
import { resetPageInfoReducer } from '../store/modules/pageInfoReducer'

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
    const { 
      title = '',
      componentList = [],
      desc = '',
      js = '',
      css = '',
      isPublished = false,
    } = data

    // 获取默认的selectedId
    let selectedId = ''
    if (componentList.length) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    // 把componentList存储到redux
    dispatch(resetComponents({
      componentList,
      selectedId,
      copiedComponent: null
    }))

    // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfoReducer({ title, desc, js, css, isPublished }))

  }, [data])
  
  return { error, loading }
}

export default useLoadQuestionData