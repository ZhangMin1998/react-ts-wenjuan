import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/modules/pageInfoReducer'

// 使用redux的数据
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.userStore) as PageInfoType
  return pageInfo
}

export default useGetPageInfo