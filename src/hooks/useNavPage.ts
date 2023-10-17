import { useEffect } from "react"
import useGetUserInfo from "./useGetUserInfo"
import { useLocation, useNavigate } from "react-router-dom"

function useNavPage(waitingUserData: boolean) {
  const navigate = useNavigate()
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()

  // 是否是登录注册页
  const isLoginOrRegister = (pathname:string) => {
    if (['/logon', '/register'].includes(pathname)) return true
    return false
  }
  // 是否不需要登录才显示的页面
  const isNeedUserInfo = (pathname:string) => {
    if (['/logon', '/register', '/'].includes(pathname)) return true
    return false
  }
  useEffect(() => {
    if (waitingUserData) return

    //已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        navigate('/manage/list')
      }
      return
    }

    // 未登录
    if (isNeedUserInfo(pathname)) {
      return
    } else {
      navigate('/login')
    }
  }, [username, waitingUserData, pathname])

}

export default useNavPage