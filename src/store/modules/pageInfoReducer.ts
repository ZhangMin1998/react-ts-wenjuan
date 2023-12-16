import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: ''
}

const pageInfoSlice = createSlice({
  name: 'pageInfo', // 模块名唯一

  // 初始数据
  initialState: INIT_STATE,

  reducers: {
    resetPageInfoReducer (state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload
    }
  }
})

const pageInfoReducer = pageInfoSlice.reducer

export const { resetPageInfoReducer } = pageInfoSlice.actions

export default pageInfoReducer