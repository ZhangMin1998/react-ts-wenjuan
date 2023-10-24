import { useSelector } from 'react-redux'
import { StateType } from '../store'
// import { loginReducer, logoutReducer } from '../store/modules/userReducer'
import { UserStateType } from '../store/modules/userReducer'

// type StateType = {
//   username: string
// }

// 使用redux的数据
function useGetUserInfo() {
  const { username } = useSelector<StateType>(state => state.userStore) as UserStateType
  return { username }
}

export default useGetUserInfo