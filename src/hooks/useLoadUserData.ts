import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
// import { StateType } from '../store'
import { loginReducer } from '../store/modules/userReducer'
// import { UserStateType } from '../store/modules/userReducer'

function useLoadUserData() {
  // 得到dispatch方法
  const dispatch = useDispatch()

  const [waitingUserData, setWaitingUserData] = useState(true)

  // ajax
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username } = result
      dispatch(loginReducer({ username }))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  }) // ajax

  // 判断redux store是否已经获取用户信息
  const { username } = useGetUserInfo() //redux store
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run() // 没有就ajax
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData