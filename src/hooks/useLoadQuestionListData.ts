import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/request'
import { useSearchParams } from 'react-router-dom'
import Mock from 'mockjs'

type OptionType = {
  isStar: boolean,
  isDeleted: boolean,
  pageSize: number,
  pageNum: Number
}
function useLoadQuestionDataList (opt: Partial<OptionType> = {}) {
  const { isStar = Mock.Random.boolean(), isDeleted = Mock.Random.boolean() } = opt
  const [searchParams] = useSearchParams()

  const {data, loading, error, refresh} = useRequest(async () => {
    const keyword = searchParams.get('keyword') || ''
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
    const pageNum = parseInt(searchParams.get('pageNum') || '') || 1

    const data = await getQuestionListService({keyword, isStar, isDeleted, pageNum, pageSize})
    return data
  },{
    refreshDeps: [searchParams] // 依赖刷新  当它的值变化后，会重新触发请求
  })
  return {data, loading, error, refresh}
}

export default useLoadQuestionDataList