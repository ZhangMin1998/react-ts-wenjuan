import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './modules/userReducer'

export type StateType = {
  userStore: UserStateType
}

export default configureStore({
  reducer: {
    // 注册子模块
    userStore: userReducer
    // 组件列表
    
    // 问卷信息
    // 还可以扩展其他模块
  }
})

// cnpm i @reduxjs/toolkit react-redux --save