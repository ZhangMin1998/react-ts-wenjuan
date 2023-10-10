import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/request'
import { useSearchParams } from 'react-router-dom'

function useLoadQuestionDataList () {
  const [searchParams] = useSearchParams()

  const {data, loading, error} = useRequest(async () => {
    const keyword = searchParams.get('keyword') || ''
    const data = await getQuestionListService({keyword})
    return data
  },{
    refreshDeps: [searchParams] // 依赖刷新  当它的值变化后，会重新触发请求
  })
  return {data, loading, error}
}

export default useLoadQuestionDataList