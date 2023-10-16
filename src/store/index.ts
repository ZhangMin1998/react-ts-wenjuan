import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/userReducer'

export default configureStore({
  reducer: {
    // 注册子模块
    userStore: userReducer
    // 还可以扩展其他模块
  }
})

// cnpm i @reduxjs/toolkit react-redux --save