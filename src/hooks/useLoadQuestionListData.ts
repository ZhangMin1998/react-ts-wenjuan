import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/request'
import { useSearchParams } from 'react-router-dom'
import Mock from 'mockjs'

type OptionType = {
  isStar: boolean,
  isDeleted: boolean
}
function useLoadQuestionDataList (opt: Partial<OptionType> = {}) {
  const { isStar = Mock.Random.boolean(), isDeleted = Mock.Random.boolean() } = opt
  const [searchParams] = useSearchParams()

  const {data, loading, error} = useRequest(async () => {
    const keyword = searchParams.get('keyword') || ''
    const data = await getQuestionListService({keyword, isStar, isDeleted})
    return data
  },{
    refreshDeps: [searchParams] // 依赖刷新  当它的值变化后，会重新触发请求
  })
  return {data, loading, error}
}

export default useLoadQuestionDataList