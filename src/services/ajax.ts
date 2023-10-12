import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000 // request timeout
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // JWT固定格式
    return config
  },
  err => Promise.reject(err)
)
// 响应拦截器 ！！！
instance.interceptors.response.use(
  res => {
    // console.log(res, res.data)
    
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData

    if (errno !== 0) {
      // 错误提示
      if (msg) message.error(msg)
    }

    return data as any
  }
)

export default instance

export type ResType = {
  errno: number,
  data?: ResDataType,
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}