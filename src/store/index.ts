import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './modules/userReducer'
import componentsReducer, { ComponentsStateType } from './modules/componentsReducer'
import pageInfoReducer, { PageInfoType } from './modules/pageInfoReducer'

export type StateType = {
  userStore: UserStateType
  componentsStore: ComponentsStateType,
  pageInfoStore: PageInfoType
}

export default configureStore({
  reducer: {
    // 注册子模块
    userStore: userReducer,
    // 组件列表
    componentsStore: componentsReducer,
    // 页面信息
    pageInfoStore: pageInfoReducer

    // 问卷信息
    // 还可以扩展其他模块
  }
})

// cnpm i @reduxjs/toolkit react-redux --save