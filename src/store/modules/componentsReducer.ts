import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string // TODO
  type: string
  title: string
  props: ComponentPropsType
}

// const INIT_STATE: ComponentInfoType = {
//   username: ''
// }

// const userSlice = createSlice({
//   name: 'user', // 模块名唯一

//   // 初始数据
//   initialState: INIT_STATE,

//   reducers: {
//     loginReducer (state: ComponentInfoType, action: PayloadAction<ComponentInfoType>) {
//       return action.payload // 设置username
//     },
//     logoutReducer: () => INIT_STATE
//   }
// })

// const userReducer = userSlice.reducer

// export const { loginReducer, logoutReducer } = userSlice.actions

// export default userReducer